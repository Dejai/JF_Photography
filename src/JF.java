import java.util.*;
import java.io.*;
import java.net.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.BufferedWriter;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.FileReader;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Random;

// public class JF extends JFrame implements Runnable {
public class JF extends JFrame {

	// Instance Variables
		// Main Window & Content Panel
		public static JFrame mainFrame = new JFrame("Managing Config Files");
		public static JPanel contentPane = new JPanel();

		// OpSystem Panel
		public static JPanel opSysPanel = new JPanel(new GridLayout(0,2));
		public static JLabel windowsOSIcon = new JLabel("");
		public static JLabel macOSIcon = new JLabel("");
		
		//Left Side 
		public static JPanel leftPanel = new JPanel(new FlowLayout());
		public static JPanel innerLeftPanel = new JPanel(new GridBagLayout());

		public static JLabel menuLabel = new JLabel("Menu: ");

		public static JButton updateDimensions = new JButton("Update Dimensions");
		public static JButton processImages = new JButton("Process Images");
		public static JButton aboutMe = new JButton("About Me");
		
		// Right Side
		public static JPanel rightPanel = new JPanel(new FlowLayout());
		public static JPanel innerRightPanel = new JPanel(new GridBagLayout());


		public static JLabel updateDimensionsLabel = new JLabel("Edit Dimensions");
		public static JPanel updateDimensionsPanel = new JPanel(new GridBagLayout());
		public static JLabel portraitLabel = new JLabel("Max width for Portrait:");
		public static JTextField portraitText = new JTextField("");
		public static JLabel squareLabel = new JLabel("Max width for Square:");
		public static JTextField squareText = new JTextField("");
		public static JButton updateDimensionsButton = new JButton("Update");
		public static JButton updateNow = new JButton("Update");


		public static JPanel imagePanel = new JPanel(new GridLayout(0,1));
		public static JLabel processingImage = new JLabel("");

		public static JLabel processingNow = new JLabel("<html>Processing Images ... <span style='color:orange;font-weight:bold;'>RUNNING NOW</span></html>");
		public static JLabel workingOn = new JLabel(">>\t");


		public static JLabel editAboutMe = new JLabel("Edit About Me");
		public static JButton toggleAboutMeEditor = new JButton("Preview");
		public static JButton saveAboutMe = new JButton("Save");

		public static JPanel aboutMePanel = new JPanel(new GridLayout(0,1));
		public static JEditorPane aboutMeTextEditor = new JEditorPane();
		public static String plainText = "";
		public static String htmlHelpText = "Add a new line:\t<br/>";


		public static JLabel htmlHelpLabel = new JLabel("How To Style your Text");

		// public static String [] helpOptions = {" ","Add a new line", "Change the color", "Make it italics", "Make it bold"};
		public static HashMap<String, String> htmlExamples = new HashMap<String, String>();
		public static JComboBox<String> helpDropDown;
		public static JLabel spanExample = new JLabel("");

		// public static JComboBox<String> helpDropDown = new JComboBox<String>(helpOptions);

		// Class Attributes:
		public static int portraitDim = 650;
		public static int squareDim = 700;
		public static ArrayList<Album> albumList = new ArrayList<Album>();
		public static ArrayList<Album> slideshowList = new ArrayList<Album>();
		// public static Album slideshowAlbum = new Album("slideshow");
		public static ArrayList<String> galleryAlbums = new ArrayList<String>();
		public static ArrayList<String> gifs = new ArrayList<String>();
		public static String slideshowDirectory;

		public static WriteToFiles myFileWriter = new WriteToFiles();
		public static FilePaths filePaths;
		// = new FilePaths("mac");

    public static void main(String args []){

		setHTMLExamples();
		mainFrame.setLayout(new GridBagLayout());

		// initFrame();
		pickOpSystem();
		mainFrame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		mainFrame.pack();
		mainFrame.setSize(800, 500);
	    mainFrame.setLocationRelativeTo(null);
		mainFrame.setVisible(true);
		menuEventListeners();

	}



	public static void pickOpSystem(){
		try{
			BufferedImage unScaledImage1 = ImageIO.read(JF.class.getResource("icons/windowsOSIcon.png"));
			Image scaledImage1 = unScaledImage1.getScaledInstance(unScaledImage1.getWidth()/4, unScaledImage1.getHeight()/4, Image.SCALE_SMOOTH);
			windowsOSIcon = new JLabel(new ImageIcon(scaledImage1));

			BufferedImage unScaledImage2 = ImageIO.read(JF.class.getResource("icons/macOSIcon.png"));
			Image scaledImage2 = unScaledImage2.getScaledInstance(unScaledImage2.getWidth(), unScaledImage2.getHeight(), Image.SCALE_SMOOTH);
			macOSIcon = new JLabel(new ImageIcon(scaledImage2));


			opSysPanel.add(windowsOSIcon);
			opSysPanel.add(macOSIcon);

			JLabel pickAnOS = new JLabel("Pick an Operating System");
			pickAnOS.setFont(new Font("Arial", Font.BOLD, 22));

			GridBagConstraints osCon1 = new GridBagConstraints();
				// osCon1.fill = GridBagConstraints.BOTH;
				osCon1.gridx = 0;
				osCon1.gridy = 0;
				osCon1.anchor = GridBagConstraints.CENTER;
				osCon1.insets = new Insets(20,0,0,0);
			mainFrame.add(pickAnOS, osCon1);

			GridBagConstraints osCon = new GridBagConstraints();
				osCon.fill = GridBagConstraints.BOTH;
				osCon.gridx = 0;
				osCon.gridy = 1;
				osCon.weighty = 1.0;
			mainFrame.add(opSysPanel, osCon);

			windowsOSIcon.addMouseListener(new MouseAdapter() {
				public void mouseClicked(MouseEvent e) {
		  			setTheOS("windows");
		  		}
		  	});
		  	
		  	macOSIcon.addMouseListener(new MouseAdapter() {
				public void mouseClicked(MouseEvent e) {
		  			setTheOS("mac");

		  		}
		  	});
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
		}
	}

	public static void setTheOS(String osName){
		filePaths = new FilePaths(osName);
		mainFrame.getContentPane().removeAll();
		mainFrame.getContentPane().repaint();
		initFrame();
		mainFrame.getContentPane().revalidate();
		mainFrame.getContentPane().repaint();
	}

	public static void initFrame(){

		JLabel [] subheaders= {htmlHelpLabel};
		for (JLabel subH : subheaders){
			subH.setFont(new Font("Arial", Font.BOLD, 16));
		}

		JLabel [] headers= {menuLabel, processingNow, editAboutMe, updateDimensionsLabel };
		for (JLabel xL : headers){
			xL.setFont(new Font("Arial", Font.BOLD, 22));
			// xL.setForeground(Color.WHITE);
		}

		JComponent [] leftSide = {leftPanel, innerLeftPanel };
		for (JComponent left : leftSide){
			// left.setBackground(new Color(0.9f, 0.9f, 0.5f));
			left.setBackground(Color.LIGHT_GRAY);
			// left.setBackground(Color.BLACK);
		}

		JComponent [] rightSide = {updateDimensionsPanel, rightPanel, innerRightPanel };
		for (JComponent right : rightSide){
			right.setBackground(new Color(0.2f, 0.5f, 0.6f));
		}

		// mainFrame.setLayout(new GridBagLayout());

		GridBagConstraints menuLabelConstraints = new GridBagConstraints();
			menuLabelConstraints.fill = GridBagConstraints.HORIZONTAL;
			menuLabelConstraints.weightx = 0.5;				
			menuLabelConstraints.gridx = 0; 
			menuLabelConstraints.gridy = 0;
			menuLabelConstraints.ipadx = 50;
			menuLabelConstraints.insets = new Insets(10,5,0,10);  //top padding
		innerLeftPanel.add(menuLabel, menuLabelConstraints);

		GridBagConstraints updateDimensionsConstraints = new GridBagConstraints();
			// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
			updateDimensionsConstraints.weightx = 0.5;				
			updateDimensionsConstraints.gridx = 0; 
			updateDimensionsConstraints.gridy = 1;
			// updateDimensionsConstraints.ipadx = 50;
			updateDimensionsConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(updateDimensions, updateDimensionsConstraints);

		GridBagConstraints processImagesConstraints = new GridBagConstraints();
			// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
			processImagesConstraints.weightx = 0.5;				
			processImagesConstraints.gridx = 0; 
			processImagesConstraints.gridy = 2;
			// updateDimensionsConstraints.ipadx = 50;
			processImagesConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(processImages, processImagesConstraints);

		GridBagConstraints aboutMeConstraints = new GridBagConstraints();
			// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
			aboutMeConstraints.weightx = 0.5;				
			aboutMeConstraints.gridx = 0; 
			aboutMeConstraints.gridy = 3;
			// updateDimensionsConstraints.ipadx = 50;
			aboutMeConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(aboutMe, aboutMeConstraints);


		GridBagConstraints l = new GridBagConstraints();
		l.fill = GridBagConstraints.BOTH;
		l.gridx = 0;
		l.gridy = 0;
		l.weighty = 1.0;
		leftPanel.add(innerLeftPanel);
		mainFrame.add(leftPanel, l);

		GridBagConstraints rightPanelConstraints = new GridBagConstraints();
			rightPanelConstraints.fill = GridBagConstraints.BOTH;
			rightPanelConstraints.weightx = 0.5;
			rightPanelConstraints.gridx = 1;
			rightPanelConstraints.gridy = 0;
			rightPanelConstraints.weighty = 1.0;
		rightPanel.add(innerRightPanel);
		mainFrame.add(rightPanel, rightPanelConstraints);
	}

	public static void clearPanel(JComponent panel){
		panel.removeAll();
		panel.revalidate();
		panel.repaint();
		innerRightPanel.setPreferredSize(new Dimension(rightPanel.getWidth()-100, rightPanel.getHeight()-50));

	}
	public static void validateView(){
		rightPanel.validate();
	}

	public static void menuEventListeners(){
		// Updating Dimensions
		updateDimensions.addActionListener(new ActionListener() {
		  public void actionPerformed(ActionEvent e) {
		  	clearPanel(innerRightPanel);
			hideHTMLExamples();

		  	GridBagConstraints firstRowConstraints = new GridBagConstraints();
				firstRowConstraints.fill = GridBagConstraints.BOTH;
				firstRowConstraints.gridx = 0; 
				firstRowConstraints.gridy = 0;
				firstRowConstraints.anchor = GridBagConstraints.CENTER;
				firstRowConstraints.insets = new Insets(10,0,20,10);  //top padding
			innerRightPanel.add(updateDimensionsLabel, firstRowConstraints);
				firstRowConstraints.fill = GridBagConstraints.NONE;
				firstRowConstraints.gridx = 1;
			innerRightPanel.add(updateNow, firstRowConstraints);

			GridBagConstraints secondSectionConstraints = new GridBagConstraints();
				secondSectionConstraints.fill = GridBagConstraints.BOTH;
				secondSectionConstraints.gridx = 0; 
				secondSectionConstraints.gridy = 1; 
				secondSectionConstraints.weighty = 0.1;
			GridBagConstraints secondRowConstraints = new GridBagConstraints();
				secondRowConstraints.fill = GridBagConstraints.HORIZONTAL;
				secondRowConstraints.anchor = GridBagConstraints.FIRST_LINE_START;
				secondRowConstraints.gridx = 0; 
				secondRowConstraints.gridy = 1;
				secondRowConstraints.weightx = 0.1;
				secondRowConstraints.ipady = 30;
				secondSectionConstraints.gridwidth = 2;
			updateDimensionsPanel.add(portraitLabel, secondRowConstraints);
				secondRowConstraints.ipady = 15;
				secondRowConstraints.gridx = 1;
			updateDimensionsPanel.add(portraitText, secondRowConstraints);
				secondRowConstraints.gridx = 0; 
				secondRowConstraints.gridy = 2;
				secondRowConstraints.weighty = 0.1;
			updateDimensionsPanel.add(squareLabel, secondRowConstraints);
				secondRowConstraints.gridx = 1;
			updateDimensionsPanel.add(squareText, secondRowConstraints);

			innerRightPanel.add(updateDimensionsPanel,secondSectionConstraints);


		  	GridBagConstraints updateDimensionsLabelConstraints = new GridBagConstraints();
				updateDimensionsLabelConstraints.fill = GridBagConstraints.BOTH;
				updateDimensionsLabelConstraints.gridx = 0; 
				updateDimensionsLabelConstraints.gridy = 0;

		  	

		  	GridBagConstraints updateDimensionsDescConstraints = new GridBagConstraints();
				updateDimensionsDescConstraints.gridx = 0; 
				updateDimensionsDescConstraints.gridy = 1;
				updateDimensionsDescConstraints.anchor = GridBagConstraints.CENTER;


		  	GridBagConstraints updateDimensionsPanelConstraints= new GridBagConstraints();
				updateDimensionsPanelConstraints.gridx = 0; 
				updateDimensionsPanelConstraints.gridy = 1;
				updateDimensionsPanelConstraints.anchor = GridBagConstraints.FIRST_LINE_START;
				updateDimensionsPanelConstraints.gridwidth = GridBagConstraints.REMAINDER;
			validateView();
			getImageDimensionLimits();
		  }
		});

		updateNow.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				saveDimensions();
				// saveUpdatedDimensions(portraitText.getText(), squareText.getText());
			}
		});	

		// Processing Images
		processImages.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
		 		try{
			 		ThreadControl myThread1 = new ThreadControl("show");
			 		Thread thread1 = new Thread(myThread1);
			 		thread1.start();
		 			thread1.join();
		 			ThreadControl myThread2 = new ThreadControl("start");
			 		Thread thread2 = new Thread(myThread2);
			 		if(!thread1.isAlive()){
			 			thread2.start();
			 		}
		 		} catch(InterruptedException ie){
		 			// resultsMessageDialog(false, "Something Went Wrong Here");
		 			ie.printStackTrace();
		 		}
		 						
			}
			
		});


		// About Me
		aboutMe.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				clearPanel(innerRightPanel);
				// clearPanel(rightPanel);
				GridBagConstraints editAboutMeConstraints = new GridBagConstraints();
					editAboutMeConstraints.fill = GridBagConstraints.BOTH;
					editAboutMeConstraints.gridx = 0; 
					editAboutMeConstraints.gridy = 0;
					editAboutMeConstraints.anchor = GridBagConstraints.CENTER;
					editAboutMeConstraints.insets = new Insets(10,0,20,10);  //top padding
				innerRightPanel.add(editAboutMe, editAboutMeConstraints);
					editAboutMeConstraints.fill = GridBagConstraints.HORIZONTAL;
					editAboutMeConstraints.gridx = 1;
					editAboutMeConstraints.insets = new Insets(10,0,20,0);  //top paddin
				innerRightPanel.add(toggleAboutMeEditor, editAboutMeConstraints);
					editAboutMeConstraints.gridx = 2;
				innerRightPanel.add(saveAboutMe, editAboutMeConstraints);


				GridBagConstraints aboutMeTextEditorC = new GridBagConstraints();
					aboutMeTextEditorC.fill = GridBagConstraints.BOTH;
					aboutMeTextEditorC.gridx = 0; 
					aboutMeTextEditorC.gridy = 1;
					aboutMeTextEditorC.weighty = 0.5;
					aboutMeTextEditorC.anchor = GridBagConstraints.FIRST_LINE_START;
					aboutMeTextEditorC.gridwidth = GridBagConstraints.REMAINDER;
				aboutMeTextEditor.setEditable(true);
				aboutMeTextEditor.setMargin(new Insets(10,10,0,10));
				// aboutMePanel.add(aboutMeTextEditor);
				// Dimension rightPanelSize = rightPanel.getSize();
				// innerRightPanel.setPreferredSize(rightPanelSize);
				// innerRightPanel.setPreferredSize(new Dimension(rightPanel.getWidth()-100, rightPanel.getHeight()-100));
				// aboutMeTextEditor.setPreferredSize(rightPanelSize);
				// innerRightPanel.add(aboutMePanel, aboutMeTextEditorC);
				innerRightPanel.add(aboutMeTextEditor, aboutMeTextEditorC);
				// innerRightPanel.add(aboutMePreviewEditor, aboutMeTextEditorC);

				
				GridBagConstraints helpLabelC = new GridBagConstraints();
					// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
					helpLabelC.weightx = 0.5;			
					helpLabelC.gridx = 0; 
					helpLabelC.gridy = 4;
					helpLabelC.insets = new Insets(30,40,0,10);
				innerLeftPanel.add(htmlHelpLabel, helpLabelC);

				GridBagConstraints helpDropDownC = new GridBagConstraints();
					// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
					helpDropDownC.weightx = 0.5;			
					helpDropDownC.gridx = 0; 
					helpDropDownC.gridy = 5;
					helpDropDownC.insets = new Insets(10,40,0,10);
				innerLeftPanel.add(helpDropDown, helpDropDownC);
				

				GridBagConstraints spanExampleC = new GridBagConstraints();
					spanExampleC.fill = GridBagConstraints.HORIZONTAL;
					spanExampleC.weightx = 0.5;			
					spanExampleC.gridx = 0; 
					spanExampleC.gridy = 6;
					spanExampleC.ipady = 10;
					spanExampleC.insets = new Insets(10,5,0,0);
				innerLeftPanel.add(spanExample, spanExampleC);
				// rightPanel.add(innerRightPanel);
				validateView();
				getAboutMeText();
			}
		});

		toggleAboutMeEditor.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				toggleAboutMeEditor();
			}
		});

		saveAboutMe.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				saveAboutMe();
			}
		});

		helpDropDown.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				String example = helpDropDown.getSelectedItem().toString();
				spanExample.setText(htmlExamples.get(example));
			}
		});
	}


	/* Action-Listener FUNCTIONS */

	public static void setHTMLExamples(){
		htmlExamples.put(" ", " ");

		StringBuilder newLineEx = new StringBuilder();
			newLineEx.append("<html>");
			newLineEx.append("previous line of text...<br/>");
			newLineEx.append("<span style='font-weight:bold;color:green;'>&lt;br/&gt;</span>");
			newLineEx.append("<br/>next line of text ...");
			newLineEx.append("</html>");
		htmlExamples.put("Add New Line", newLineEx.toString());

		StringBuilder generalEx = new StringBuilder();
			generalEx.append("<html>");
			generalEx.append("&lt;span ");
			generalEx.append("<span style='font-weight:bold;color:green;'>style=\"...\"</span>");
			generalEx.append("&gt;<br/>");
			generalEx.append("&nbsp;&nbsp;text goes here <br/> &lt;span/&gt;");
			generalEx.append("<p style='color:red; font-size:8px;font-weight:bold;margin-top:10px;'>NOTE: You can add multiple styles.<br/>Just separate them with a semicolon.</p>");
			generalEx.append("</html>");
		htmlExamples.put("Add Style (in general)", generalEx.toString());

		StringBuilder colorEx = new StringBuilder();
			colorEx.append("<html>");
			colorEx.append("&lt;span ");
			colorEx.append("style=\"<span style='font-weight:bold;color:green;'>color:red;</span>\"");
			colorEx.append("&gt;<br/>");
			colorEx.append("&nbsp;&nbsp;text goes here <br/> &lt;span/&gt;");
			colorEx.append("<p style='color:red; font-size:8px;font-weight:bold;margin-top:10px;'>NOTE: You can enter most colors. <br/> Just enter the name.</p>");
			colorEx.append("</html>");
		htmlExamples.put("Change text color", colorEx.toString());


		StringBuilder italicsEx = new StringBuilder();
			italicsEx.append("<html>");
			italicsEx.append("&lt;span ");
			italicsEx.append("style=\"<span style='color:green;font-weight:bold;'>font-style:italics;</span>\"");
			italicsEx.append("&gt;<br/>");
			italicsEx.append("&nbsp;&nbsp;text goes here <br/>");
			italicsEx.append("&lt;span/&gt;");
			italicsEx.append("</html>");
		htmlExamples.put("Make text italics", italicsEx.toString());

		StringBuilder boldEx = new StringBuilder();
			boldEx.append("<html>");
			boldEx.append("&lt;span ");
			boldEx.append("style=\"<span style='color:green;font-weight:bold;'>font-weight:bold;</span>\"");
			boldEx.append("&gt;<br/>");
			boldEx.append("&nbsp;&nbsp;text goes here <br/>");
			boldEx.append("&lt;span/&gt;");
			boldEx.append("</html>");
		htmlExamples.put("Make text bold", boldEx.toString());

		String [] tempStringArr = htmlExamples.keySet().toArray(new String[htmlExamples.size()]);
		Arrays.sort(tempStringArr);
		helpDropDown = new JComboBox<String>(tempStringArr);
	}

	public static void hideHTMLExamples(){
		innerLeftPanel.remove(htmlHelpLabel);
		innerLeftPanel.remove(helpDropDown);
		innerLeftPanel.remove(spanExample);				
	}

	public static void saveAboutMe(){
		try{
			String saveText;
			boolean saveAboutMeStatus; 
			if (aboutMeTextEditor.getContentType() == "text/html"){
				saveAboutMeStatus = myFileWriter.writeAboutMeText(filePaths.aboutMeFilePath, plainText);
			} else {
				saveAboutMeStatus = myFileWriter.writeAboutMeText(filePaths.aboutMeFilePath, aboutMeTextEditor.getText());
			}
			

			if (saveAboutMeStatus){
				resultsMessageDialog(true, "<html><span style='color:green;font-weight:bold'>SUCCESS</span>: <span style='font-style:italics'>'About Me'</span> file successfully updated</html>");
			} else{
				resultsMessageDialog(false, "<html><span style='color:red;font-weight:bold'>FAILED</span>: <span style='font-style:italics'>'About Me'</span> file not updated</html>");
			}
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
		}
	}

	public static void saveDimensions(){
		try{
			boolean saveDimensionsStatus = myFileWriter.writeUpdatedDimensions(filePaths.dimensionsFilePath, portraitText.getText(), squareText.getText());
			if (saveDimensionsStatus){
				resultsMessageDialog(true, "<html><span style='color:green;font-weight:bold'>SUCCESS</span>: Dimensions were successfully updated</html>");
			} else{
				resultsMessageDialog(false, "<html><span style='color:red;font-weight:bold'>FAILED</span> to update Dimensions.");
			}
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
		}
	}

	public static void toggleAboutMeEditor(){
		try{
			String contentType = aboutMeTextEditor.getContentType();
			if(contentType == "text/plain"){
				toggleAboutMeEditor.setText("Edit");
				plainText = aboutMeTextEditor.getText();
				aboutMeTextEditor.setBackground(Color.BLACK);
				aboutMeTextEditor.setContentType("text/html");
				aboutMeTextEditor.setEditable(false);
				aboutMeTextEditor.setText(plainText);
			} else {
				toggleAboutMeEditor.setText("Preview");
				aboutMeTextEditor.setBackground(Color.WHITE);
				aboutMeTextEditor.setContentType("text/plain");
				aboutMeTextEditor.setEditable(true);
				aboutMeTextEditor.setText(plainText);
			}
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
		}
	}


	

	/* GET Objects */ 

	public static void getGalleryAlbums(){
		try{
			File gallery = new File(filePaths.galleryPath);
			File [] galleryList = gallery.listFiles();
			for (int x = 0; x < galleryList.length; x++){
				if (galleryList[x].isDirectory()){
					String newName = galleryList[x].getName().trim().replaceAll(" ", "_");
					String newPath = String.format("%s%s", filePaths.galleryPath, newName);
					// String newPath = "images/gallery/";
					// newPath = newPath.concat(newName);
					File newDir = new File (newPath);
					galleryList[x].renameTo(newDir);
					galleryAlbums.add(newPath);
				}
			}
		} catch (Exception ex){
			// resultsMessageDialog(false, ex.getMessage());
			ex.printStackTrace();

		}
	}

	public static void getGIFs(){
		try{
			File gif = new File(filePaths.gifsPath);
			File [] gifList = gif.listFiles();
			for (int x = 0; x < gifList.length; x++){
				if (gifList[x].getPath().contains(".gif")){
					gifs.add(gifList[x].getPath());
				}
			}
		} catch (Exception ex){
		    // ex.printStackTrace();
			resultsMessageDialog(false, ex.getMessage());
		}
	}

	public static void getImageDimensionLimits(){
		String line; 
		try{
			// filePaths.dimensionsFilePath = "config/dimConfig.txt";

			BufferedReader dimConfig = new BufferedReader(new FileReader(filePaths.dimensionsFilePath));
			while ( (line = dimConfig.readLine()) != null){
				String [] lineSplit = line.split("=");
				switch(lineSplit[0]){
					case "portrait":
						portraitDim = Integer.parseInt(lineSplit[1]);
						portraitText.setText(lineSplit[1]);
						break;
					case "square":
						squareDim = Integer.parseInt(lineSplit[1]);
						squareText.setText(lineSplit[1]);
						break;
					default:
						portraitDim = 650;
						squareDim = 900;
				}
			}
		} catch (Exception ex){
		    ex.printStackTrace();
			// resultsMessageDialog(false, ex.getMessage());
		}
	}

	public static void getAboutMeText(){
		String line; 
		String fullText = ""; 
		try{
			// aboutMeFilePath = "config/aboutMe.txt";
			BufferedReader aboutMeReader = new BufferedReader(new FileReader(filePaths.aboutMeFilePath));
			while ( (line = aboutMeReader.readLine()) != null){
				fullText = fullText.concat(line);
			}
			aboutMeTextEditor.setText(fullText);
		} catch (Exception ex){
		    ex.printStackTrace();
			// resultsMessageDialog(false, ex.getMessage());
		}
	}


	/* PROCESSING IMAGES */

	public static void showImageProcessing(){
		try{
			hideHTMLExamples();
			getGIFs();
			
			clearPanel(innerRightPanel);
			GridBagConstraints processingNowConstraints = new GridBagConstraints();
				processingNowConstraints.fill = GridBagConstraints.BOTH;
				// imagePanelConstraints.weightx = 1.0;
				processingNowConstraints.gridx = 0; 
				processingNowConstraints.gridy = 0;
				processingNowConstraints.anchor = GridBagConstraints.CENTER;
				processingNowConstraints.insets = new Insets(10,0,20,0);  //top padding
			innerRightPanel.add(processingNow, processingNowConstraints);

			GridBagConstraints imagePanelConstraints = new GridBagConstraints();
				imagePanelConstraints.fill = GridBagConstraints.BOTH;
				// imagePanelConstraints.weightx = 1.0;
				imagePanelConstraints.gridx = 0; 
				imagePanelConstraints.gridy = 1;
				imagePanelConstraints.anchor = GridBagConstraints.CENTER;


			// BufferedImage unScaledImage = ImageIO.read(new File("gifs/fingerTapping.gif"));
			// Image scaledImage = unScaledImage.getScaledInstance(unScaledImage.getWidth()/2, unScaledImage.getHeight()/2, Image.SCALE_SMOOTH);
		// image.setIcon(new ImageIcon(scaledImage));
						// image.setSize(imageB.getWidth()/2, imageB.getHeight()/2);
			Random rand = new Random();
			String procImg = gifs.get(rand.nextInt(gifs.size()));
			processingImage.setIcon(new ImageIcon(procImg));
			imagePanel.add(processingImage);
			innerRightPanel.add(imagePanel, imagePanelConstraints);
		
			GridBagConstraints workingOnConstraints = new GridBagConstraints();
				workingOnConstraints.fill = GridBagConstraints.HORIZONTAL;
				workingOnConstraints.weighty = 1.0;
				workingOnConstraints.gridx = 0; 
				workingOnConstraints.gridy = 2;
				workingOnConstraints.insets = new Insets(10,0,0,0);  //top padding
			innerRightPanel.add(workingOn, workingOnConstraints);
			validateView();
		} catch (Exception ec){
			// resultsMessageDialog(false, ec.getMessage());
		 	ec.printStackTrace();
		}	
	}

	public static void startImageProcessing(){
		try{
			getGalleryAlbums();

			// slideshowDirectory = "images/slideshow";

			processImages(filePaths.slideshowPath, slideshowList);
			boolean slideshowBool = myFileWriter.writeJSONFile("config/slideshowJSON.txt", slideshowList);

			for (String x : galleryAlbums){
				processImages(x, albumList);
			}
			boolean albumsBool = myFileWriter.writeJSONFile("config/albumsJSON.txt", albumList);

			String processSlideshowResults = slideshowBool ? "<span style='color:green;font-weight:bold'>SUCCESS</span> processing the Slideshow images" : "<span style='color:red;font-weight:bold'>FAILED</span> to process the Slideshow images";
			String processAlbumsResults = albumsBool ? "<span style='color:green;font-weight:bold'>SUCCESS</span> processing the Album images" : "<span style='color:red;font-weight:bold'>FAILED</span> to process the Album images";

			String succMsg = String.format("<html> %s <br/> <br/> %s </html>", processSlideshowResults, processAlbumsResults);

			if (slideshowBool && albumsBool){
				processingNow.setText("<html>Processing Images ... <span style='color:#66ff33;font-weight:bold;'>DONE</span></html>");
				resultsMessageDialog(true, succMsg);
			} else {
				processingNow.setText("<html>Processing Images ... <span style='color:red;font-weight:bold;'>DONE</span></html>");
				resultsMessageDialog(false, succMsg);
			}
			// resultsMessageDialog(true, succMsg);
			// clearPanel(innerRightPanel);
			// validateView();
		} catch (Exception ex){
			// resultsMessageDialog(false, ex.getMessage());
		 	ex.printStackTrace();


		}	
	}
	
	public static void processImages(String directoryPath, ArrayList<Album> albumArrayList){	
		try{
			File dir = new File(directoryPath);
			File dirList[] = dir.listFiles();
	
			String freedom = directoryPath.substring(directoryPath.lastIndexOf("/")+1);
			albumArrayList.add(new Album(freedom));
			// String albumCover_temp = ;
			for (int x = 0; x < dirList.length; x++){
				boolean isImage; 
				String dimensionTemp = "";
				String extension = dirList[x].getPath().substring(dirList[x].getPath().lastIndexOf("."));
				switch(extension){
					case ".jpg":
					case ".png":
					case ".gif":
						isImage = true;
						break;
					default:
						isImage = false; 
				}
				if (!dirList[x].isDirectory() && isImage){
					workingOn.setText(String.format("<html> >> Working on <span style='font-weight:bold; color:white;'>%s</span></html>", dirList[x].getPath()));
					// System.out.println(String.format(">> Working on %s", dirList[x].getPath()));
					BufferedImage imageB = ImageIO.read(new File(dirList[x].getPath()));
					if (imageB.getWidth() <= portraitDim){
						dimensionTemp = "portrait";
					} else if (imageB.getWidth() > portraitDim && imageB.getWidth() <= squareDim){
						dimensionTemp = "square";
					} else{
						dimensionTemp = "landscape";
					}

					
					if ( !albumArrayList.get(albumArrayList.size()-1).hasCoverImage || dirList[x].getPath().contains("cover_") ) {
						// System.out.printf("Setting album cover to:  %s\n", dirList[x].getPath());
						albumArrayList.get(albumArrayList.size()-1).setCoverImage(dirList[x].getPath());
					} else {
						// System.out.println("Aready has an album cover");
					}
					// if (  )  {
					// } else if ({
					// 	albumArrayList.get(albumArrayList.size()-1).setCoverImage(dirList[x].getPath());
					// }
					// 	System.out.println("It is set");
					// } else {
						// albumArrayList.get(albumArrayList.size()-1).coverImage = dirList[x].getPath();
					// }
					// if (x == 0 || dirList[x].getPath().contains("cover_")){
						// albumArrayList.get(albumArrayList.size()-1).coverImage = dirList[x].getPath();
						// albumArrayList.get(albumArrayList.size()-1).setCoverImage(dirList[x].getPath());
					// }
					// albumArrayList.get(albumArrayList.size()-1).pictures.add(new Picture(dirList[x].getPath(), dimensionTemp));
					albumArrayList.get(albumArrayList.size()-1).pics.put(dirList[x].getPath(), dimensionTemp);

				}
			}
		} catch (Exception ex){
		    // resultsMessageDialog(false, ex.getMessage());
		 	ex.printStackTrace();

		    // return NULL;
		}
	}



	public static void resultsMessageDialog(boolean success, String message){
		if (message.length() < 1){
			message = "Something went wrong!";
		}
		if (success){
			JOptionPane.showMessageDialog(mainFrame, message, "Success", JOptionPane.INFORMATION_MESSAGE);
		} else {
			JOptionPane.showMessageDialog(mainFrame, message, "Error", JOptionPane.ERROR_MESSAGE);
			// JOptionPane.showMessageDialog(mainFrame, "Something went wrong", "Error", JOptionPane.ERROR_MESSAGE);
		}
	}
}