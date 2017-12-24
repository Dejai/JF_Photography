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

public class Main extends JFrame {

	// JComponent Attributes
		// Main Window & Content Panel
			public static JFrame mainFrame = new JFrame("Managing Config Files");
			public static JPanel contentPane = new JPanel();

		// Bottom Section
			public static JPanel bottomPanel = new JPanel(new FlowLayout());
			public static JLabel poweredByLabel = new JLabel("");

		
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

			public static JLabel getStartedLabel = new JLabel("Click on a menu option to get started.");


			public static JLabel compressImagesReminder = new JLabel("<html><p>Remember to compress your images!</p></html>");
			public static JButton useTinyPng = new JButton("<html><font color='blue'><strong>Click here to go to TinyPng.com</strong></font></html>");
			public static URI tinyPngURI;
			public static JButton startImageProcessing = new JButton("Start Processing");


			// Processing Images
				public static JPanel imagePanel = new JPanel(new GridLayout(0,1));
				public static JLabel processingImage = new JLabel("");

				public static JLabel processingNow = new JLabel("");
				public static JLabel workingOn = new JLabel(">>\t");

			// About Me Sections
				public static JLabel editAboutMe = new JLabel("Edit About Me");
				public static JButton toggleAboutMeEditor = new JButton("Preview");
				public static JButton saveAboutMe = new JButton("Save");

				public static JPanel aboutMePanel = new JPanel(new GridLayout(0,1));
				public static JEditorPane aboutMeTextEditor = new JEditorPane();
				public static String plainText = "";
				// public static String htmlHelpText = "Add a new line:\t<br/>";

				// Help Info for Styling About Me Text
					public static JLabel htmlHelpLabel = new JLabel("How To Style your Text");

					public static HashMap<String, String> htmlExamples = new HashMap<String, String>();
					public static JComboBox<String> helpDropDown;
					public static JLabel spanExample = new JLabel("");

		// public static JComboBox<String> helpDropDown = new JComboBox<String>(helpOptions);

	// ConfigTool Class Instance Attributes:
		public static int portraitDim = 650;
		public static int squareDim = 700;
		// public static ArrayList<Album> albumsList;
		 // = new ArrayList<Album>();
		// public static ArrayList<String> galleryAlbums = new ArrayList<String>();
		public static ArrayList<String> gifs = new ArrayList<String>();

		// Custom objects
		public static WriteToFiles myFileWriter;
		public static FilePaths filePaths;


    public static void main(String args []){

		// myFileWriter = new WriteToFiles();
		// filePaths = new FilePaths();

  //   	processDirectory("../../images/assets/profile", albumsList);
		// processDirectory("../../images/slideshow", albumsList);
		// boolean oneBool = myFileWriter.writeJSONFile("../../config/albumsJSON.json", albumsList);
		// System.out.println(oneBool);

    	
		setHTMLExamples();
		mainFrame.setLayout(new GridBagLayout());
		
		filePaths = new FilePaths();
		myFileWriter = new WriteToFiles();

		initFrame();
		mainFrame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		mainFrame.pack();
		mainFrame.setSize(800, 500);
	    mainFrame.setLocationRelativeTo(null);
		mainFrame.setVisible(true);
		menuEventListeners();

	}


	public static void initFrame(){

		JLabel [] subheaders= {htmlHelpLabel};
		for (JLabel subH : subheaders){
			subH.setFont(new Font("Arial", Font.BOLD, 16));
		}

		JLabel [] headers= {menuLabel, processingNow, editAboutMe, getStartedLabel, compressImagesReminder };
		for (JLabel xL : headers){
			xL.setFont(new Font("Arial", Font.BOLD, 22));
			// xL.setForeground(Color.WHITE);
		}

		JComponent [] leftSide = {leftPanel, innerLeftPanel, bottomPanel};
		for (JComponent left : leftSide){
			left.setBackground(Color.LIGHT_GRAY);
		}
		mainFrame.getContentPane().setBackground(Color.GRAY);
		bottomPanel.setBackground(Color.GRAY);

		JComponent [] rightSide = {rightPanel, innerRightPanel };
		for (JComponent right : rightSide){
			right.setBackground(new Color(0.2f, 0.5f, 0.6f));
		}


		GridBagConstraints menuLabelConstraints = new GridBagConstraints();
			menuLabelConstraints.fill = GridBagConstraints.HORIZONTAL;
			menuLabelConstraints.weightx = 0.5;				
			menuLabelConstraints.gridx = 0; 
			menuLabelConstraints.gridy = 0;
			menuLabelConstraints.ipadx = 50;
			menuLabelConstraints.insets = new Insets(10,5,0,10);  //top padding
		innerLeftPanel.add(menuLabel, menuLabelConstraints);

		GridBagConstraints processImagesConstraints = new GridBagConstraints();
			// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
			processImagesConstraints.weightx = 0.5;				
			processImagesConstraints.gridx = 0; 
			processImagesConstraints.gridy = 1;
			// updateDimensionsConstraints.ipadx = 50;
			processImagesConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(processImages, processImagesConstraints);

		GridBagConstraints aboutMeConstraints = new GridBagConstraints();
			// updateDimensionsConstraints.fill = GridBagConstraints.HORIZONTAL;
			aboutMeConstraints.weightx = 0.5;				
			aboutMeConstraints.gridx = 0; 
			aboutMeConstraints.gridy = 2;
			// updateDimensionsConstraints.ipadx = 50;
			aboutMeConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(aboutMe, aboutMeConstraints);

		

		GridBagConstraints getStartedConstraints = new GridBagConstraints();
			getStartedConstraints.insets = new Insets(40,0,0,0); 
		innerRightPanel.add(getStartedLabel, getStartedConstraints);




		GridBagConstraints poweredByC = new GridBagConstraints();
			// poweredByC.fill = GridBagConstraints.VERTICAL;
			poweredByC.ipady = 0;       //reset to default
			// poweredByC.weightx = 0.5;   //request any extra vertical space
			poweredByC.anchor = GridBagConstraints.LINE_START; //bottom of space
			poweredByC.insets = new Insets(0,10,0,0);  //top padding
			poweredByC.gridx = 0;       //aligned with button 2
			poweredByC.gridwidth = 1;   //2 columns wide
			poweredByC.gridy = 1;       //third row

		GridBagConstraints l = new GridBagConstraints();
			l.fill = GridBagConstraints.BOTH;
			l.gridx = 0;
			l.gridy = 0;
			l.weighty = 1.0;
		leftPanel.add(innerLeftPanel);
		mainFrame.add(leftPanel, l);
		poweredByLabel.setText(String.format("<html><div style='color:white;'>%s: <span style='font-weight:bold; font-style:italics'>%s</span></div></html>", "Powered By", filePaths.opSystemFull));
		bottomPanel.add(poweredByLabel);
		mainFrame.add(bottomPanel, poweredByC);


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

		// Processing Images
		processImages.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				showImagePreProcessing();
			}
		});

		startImageProcessing.addActionListener(new ActionListener(){
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
		 			resultsMessageDialog(false, ie.getMessage());
		 		}				
			}
		});

		useTinyPng.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				if (Desktop.isDesktopSupported()) {
					try {
			        	Desktop.getDesktop().browse(tinyPngURI);
				   	} catch (IOException ex) { /* TODO: error handling */ 

				   	}
				} else { 
				    /* TODO: error handling */ 
				}
			}
		});

		// About Me
		aboutMe.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				showAboutMesection();
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


	/* ADDING / CHANGING / REMOVING SECTIONS */

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

	public static void showAboutMesection(){
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

	public static void showImagePreProcessing(){

		try{
			tinyPngURI = new URI("http://tinypng.com");
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		}
		clearPanel(innerRightPanel);
		hideHTMLExamples();

		GridBagConstraints preProcessCon = new GridBagConstraints();
			preProcessCon.fill = GridBagConstraints.HORIZONTAL;
			preProcessCon.gridx = 0;
			preProcessCon.gridy = 0;
			preProcessCon.weightx = 1;
			preProcessCon.insets = new Insets(0,0,20,60);
		innerRightPanel.add(compressImagesReminder, preProcessCon);
			preProcessCon.gridy = 1;
		innerRightPanel.add(useTinyPng, preProcessCon);
			// preProcessCon.fill = GridBagConstraints.NONE;
			preProcessCon.gridy = 2;
			preProcessCon.weightx = 0;
		innerRightPanel.add(startImageProcessing, preProcessCon);

		validateView();


	}
	

	/* SAVING FILES */

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
	


	/* GET Objects */ 
	public static ArrayList<String> getGalleryAlbums(){
		try{
			ArrayList<String> galleryAlbums = new ArrayList<String>();

			File gallery = new File(filePaths.galleryDirectoryPath);
			File [] galleryList = gallery.listFiles();
			for (int x = 0; x < galleryList.length; x++){
				if (galleryList[x].isDirectory()){
					String newName = galleryList[x].getName().trim();
					// .replaceAll(" ", "_");
					String newPath = String.format("%s%s%s", filePaths.galleryDirectoryPath, filePaths.separator, newName);
					// String newPath = "images/gallery/";
					// newPath = newPath.concat(newName);
					// File newDir = new File (newPath);
					// galleryList[x].renameTo(newDir);
					// resultsMessageDialog(true, newPath);
					galleryAlbums.add(newPath);
				}
			}
			return galleryAlbums;
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
			// ex.printStackTrace();
			return null;

		}
	}

	public static void getAboutMeText(){
		try{
			String line; 
			String fullText = ""; 
			BufferedReader aboutMeReader = new BufferedReader(new FileReader(filePaths.aboutMeFilePath));
			while ( (line = aboutMeReader.readLine()) != null){
				fullText = fullText.concat(line);
			}
			aboutMeTextEditor.setText(fullText);
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
		}
	}


	/* PROCESSING IMAGES */

	public static void showImageProcessingSection(){
		try{
			hideHTMLExamples();
			
			clearPanel(innerRightPanel);
			GridBagConstraints processingNowConstraints = new GridBagConstraints();
				processingNowConstraints.fill = GridBagConstraints.BOTH;
				// imagePanelConstraints.weightx = 1.0;
				processingNowConstraints.gridx = 0; 
				processingNowConstraints.gridy = 0;
				processingNowConstraints.anchor = GridBagConstraints.CENTER;
				processingNowConstraints.insets = new Insets(10,0,20,0);  //top padding
			processingNow.setText("<html>Processing Images ... <span style='color:orange;font-weight:bold;'>RUNNING NOW</span></html>");
			innerRightPanel.add(processingNow, processingNowConstraints);

			GridBagConstraints imagePanelConstraints = new GridBagConstraints();
				imagePanelConstraints.fill = GridBagConstraints.BOTH;
				// imagePanelConstraints.weightx = 1.0;
				imagePanelConstraints.gridx = 0; 
				imagePanelConstraints.gridy = 1;
				imagePanelConstraints.anchor = GridBagConstraints.CENTER;


			// Random rand = new Random();
			// String procImg = gifs.get(rand.nextInt(gifs.size()));
			String procImg = filePaths.getRandomGIF();
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
		} catch (Exception ex){
			resultsMessageDialog(false, ex.getMessage());
		 	// ex.printStackTrace();
		}	
	}

	public static void processImages(){
		try{

			ArrayList<Album> albumzList = new ArrayList<Album>();
			// Process the profile picture
			albumzList.add(processDirectory(filePaths.profileDirectoryPath));

			// Process the slideshow pictures
			albumzList.add(processDirectory(filePaths.slideshowDirectoryPath));

			ArrayList<String> galleryAlbums = getGalleryAlbums();
			for (String x : galleryAlbums){
				albumzList.add(processDirectory(x));
			}

			// Attempt to write the JSON file for all the albums
			boolean oneBool = myFileWriter.writeJSONFile(filePaths.albumsJSONPath, albumzList);


			String successMesage = "<span style='color:green;font-weight:bold'>SUCCESS:</span> All images were processed successfully.";
			String failMessage = "<span style='color:red;font-weight:bold'>ERROR:</span>Could not complete the process.";

			String resultsMessage = oneBool ? successMesage : failMessage;
			String resultsMessageFormatted = String.format("<html> %s </html>", resultsMessage);

			if (oneBool){
				processingNow.setText("Processing Images");
				workingOn.setText("");
				processingImage.setIcon(new ImageIcon(filePaths.successProcessingImg));
				resultsMessageDialog(true, resultsMessageFormatted);
			} else {
				processingNow.setText("Processing Images");
				workingOn.setText("<html>Something went wrong. To try and remedy this, go to the 'src' folder and click on the filePermission file (the one with the gear icon).</html>");
				processingImage.setIcon(new ImageIcon(filePaths.oopsImg));
				resultsMessageDialog(false, resultsMessageFormatted);
			}
		} catch (Exception ex){
			ex.printStackTrace();
			resultsMessageDialog(false, ex.getMessage());
			}	
	}
	
	// public static void processDirectory(String directoryPath, ArrayList<Album> albumArrayList){
	public static Album processDirectory(String directoryPath){
		try{
			// System.out.println(directoryPath);
			// System.out.printf("Portrait <= %d\n", portraitDim);
			// System.out.printf("Square > %d <= %d\n", portraitDim, squareDim);
			// System.out.printf("Landscape > %d\n", squareDim);
			// System.out.println();
			File dir = new File(directoryPath);
			File dirList[] = dir.listFiles();
			String albumName = directoryPath.substring(directoryPath.lastIndexOf(filePaths.separator)+1);

			// albumArrayList.add(new Album(albumName));

			Album temp = new Album(albumName);

			for (int x = 0; x < dirList.length; x++){
				boolean isImage; 
				String dimensionTemp = "";
				// String extension;
				isImage = checkIfIsImage(dirList[x].getPath());

				if (!dirList[x].isDirectory() && isImage){
					BufferedImage imageB = ImageIO.read(new File(dirList[x].getPath()));
					workingOn.setText(String.format("<html>Working on:<br/><span style='font-weight:bold; color:white;'>%s</span></html>", dirList[x].getPath()));
					// workingOn.setText(String.format("Width: %s | Height : %s", imageB.getWidth(), imageB.getHeight()));
					
					// if (imageB.getWidth() <= portraitDim || imageB.getHeight() > imageB.getWidth()){
					// 	dimensionTemp = "portrait";
					// } else if (imageB.getWidth() > portraitDim && imageB.getWidth() <= squareDim){
					// 	dimensionTemp = "square";
					// } else {
					// 	dimensionTemp = "landscape";
					// }
					if (imageB.getHeight() > imageB.getWidth()){
						dimensionTemp = "portrait";
					} else if ( imageB.getWidth() > imageB.getHeight() ){
						dimensionTemp = "landscape";
					} else if (imageB.getWidth() == imageB.getHeight() ) {
						dimensionTemp = "square";
					} else {
						dimensionTemp = "landscape";
					}

					temp.addPicture(dirList[x].getPath(), imageB.getWidth(), imageB.getHeight(), dimensionTemp);

					if (!temp.hasCoverImage || dirList[x].getPath().contains("cover_") ){
						temp.setCoverImage(dirList[x].getPath());
					}
				}
			}
			return temp;
		} catch (Exception ex){
		    // resultsMessageDialog(false, ex.getMessage());
		    System.out.println(ex.getMessage());
		 	ex.printStackTrace();
		 	return null;
		}
	}

	public static boolean checkIfIsImage(String imagePath){
		boolean isImage; 
		if (imagePath.contains(".")) {
			String extension = imagePath.substring(imagePath.lastIndexOf(".")).toLowerCase();
			switch(extension){
				case ".jpg":
				case ".png":
				case ".gif":
					isImage = true;
					break;
				default:
					isImage = false; 
			}
		} else {
			isImage = false; 
		}
		return isImage;
	} 

	public static void resultsMessageDialog(boolean success, String msg){

		String message = !msg.isEmpty() ? msg : "Unknown Error!";

		if (success){
			JOptionPane.showMessageDialog(mainFrame, message, "Success", JOptionPane.INFORMATION_MESSAGE);
		} else {
			JOptionPane.showMessageDialog(mainFrame, message, "Error", JOptionPane.ERROR_MESSAGE);
			// JOptionPane.showMessageDialog(mainFrame, "Something went wrong", "Error", JOptionPane.ERROR_MESSAGE);
		}
	}
}
