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


public class Frames extends JFrame {


	// JComponent Attributes
		// Main Window & Content Panel
			JPanel contentPane = new JPanel();

		// Bottom Section
			JPanel bottomPanel = new JPanel(new FlowLayout());
			JLabel poweredByLabel = new JLabel("");

		
		//Left Side 
			JPanel leftPanel = new JPanel(new FlowLayout());
			JPanel innerLeftPanel = new JPanel(new GridBagLayout());

			JLabel menuLabel = new JLabel("Menu:");

			JButton updateDimensions = new JButton("Update Dimensions");
			JButton processImages = new JButton("Process Images");
			JButton aboutMe = new JButton("About Me");
		
		// Right Side
			JPanel rightPanel = new JPanel(new FlowLayout());
			JPanel innerRightPanel = new JPanel(new GridBagLayout());

			JLabel getStartedLabel = new JLabel("Click on a menu option to get started.");


			JLabel compressImagesReminder = new JLabel("<html><p>Remember to compress your images!</p></html>");
			JButton useTinyPng = new JButton("<html><font color='blue'><strong>Click here to go to TinyPng.com</strong></font></html>");
			URI tinyPngURI;
			JButton startImageProcessing = new JButton("Start Processing");


			// Processing Images
				JPanel imagePanel = new JPanel(new GridLayout(0,1));
				JLabel processingImage = new JLabel("");

				JLabel processingNow = new JLabel("");
				JLabel workingOn = new JLabel(">>\t");

			// About Me Sections
				JLabel editAboutMe = new JLabel("Edit About Me");
				JButton toggleAboutMeEditor = new JButton("Preview");
				JButton saveAboutMe = new JButton("Save");

				JPanel aboutMePanel = new JPanel(new GridLayout(0,1));
				JEditorPane aboutMeTextEditor = new JEditorPane();
				String plainText = "";
				// String htmlHelpText = "Add a new line:\t<br/>";

			// Help Info for Styling About Me Text
				JLabel htmlHelpLabel = new JLabel("How To Style your Text");

				HashMap<String, String> htmlExamples = new HashMap<String, String>();
				JComboBox<String> helpDropDown;
				JLabel spanExample = new JLabel("");

		// Containers of Components
			JButton [] actionableButtons = { processImages, aboutMe };
			JLabel [] subheaders= {htmlHelpLabel};
			JLabel [] headers= {menuLabel, processingNow, editAboutMe, getStartedLabel, compressImagesReminder };
			JComponent [] leftSide = {leftPanel, innerLeftPanel, bottomPanel};
			JComponent [] rightSide = {rightPanel, innerRightPanel };

	public Frames( String title, String opSystem){

		super ( title ); 
		setSize(800, 500);
		setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
		setLayout(new GridBagLayout());
		initFrame(opSystem);
		menuEventListeners();

		// testActionables();

	}

	public void testActionables(){
		for (JButton c : actionableButtons){
			// System.out.println(c.toString());
			String test = parseAction(c.toString());
			System.out.printf("Results of parseAction = %s\n", test);

		}
	}

	public static String parseAction(String value){
		int textIndex = value.indexOf("text=");
		String firstSub = value.substring(textIndex); 
		int cutOffIndex = firstSub.indexOf(",");
		String secondSub = firstSub.substring(0, cutOffIndex);
		String action = secondSub.split("=")[1];
		return action;
	}

	public void initFrame(String opSystem){

		for (JLabel subH : subheaders){
			subH.setFont(new Font("Arial", Font.BOLD, 16));
		}

		for (JLabel header : headers){
			header.setFont(new Font("Arial", Font.BOLD, 22));
		}

		for (JComponent left : leftSide){
			left.setBackground(Color.LIGHT_GRAY);
		}
		this.getContentPane().setBackground(Color.GRAY);
		bottomPanel.setBackground(Color.GRAY);

		for (JComponent right : rightSide){
			right.setBackground(new Color(0.2f, 0.5f, 0.6f));
		}

		innerLeftPanel.add(menuLabel, new GridBagParams("menuLabel"));

		// GridBagConstraints processImagesConstraints = new GridBagConstraints();
		// 	processImagesConstraints.weightx = 0.5;				
		// 	processImagesConstraints.gridx = 0; 
		// 	processImagesConstraints.gridy = 1;
		// 	processImagesConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(processImages, new GridBagParams("processImagesButton"));

		// GridBagConstraints aboutMeConstraints = new GridBagConstraints();
		// // aboutMeButton
		// // 	aboutMeConstraints.weightx = 0.5;				
		// // 	aboutMeConstraints.gridx = 0; 
		// // 	aboutMeConstraints.gridy = 2;
		// // 	aboutMeConstraints.insets = new Insets(10,40,0,0); 
		// // innerLeftPanel.add(aboutMe, aboutMeConstraints);
		innerLeftPanel.add(aboutMe, new GridBagParams("aboutMeButton"));


		

		// GridBagConstraints getStartedConstraints = new GridBagConstraints();
		// // startProcessingImagesButton
		// // 	getStartedConstraints.insets = new Insets(40,0,0,0); 
		// innerRightPanel.add(getStartedLabel, getStartedConstraints);
		innerRightPanel.add(getStartedLabel, new GridBagParams("startProcessingImagesButton"));





		GridBagConstraints poweredByC = new GridBagConstraints();
			poweredByC.ipady = 0;       //reset to default
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
		this.add(leftPanel, l);
		poweredByLabel.setText(String.format("<html><div style='color:white;'>Powered By: <span style='font-weight:bold; font-style:italics'>%s</span></div></html>", opSystem));
		bottomPanel.add(poweredByLabel);
		this.add(bottomPanel, poweredByC);


		GridBagConstraints rightPanelConstraints = new GridBagConstraints();
			rightPanelConstraints.fill = GridBagConstraints.BOTH;
			rightPanelConstraints.weightx = 0.5;
			rightPanelConstraints.gridx = 1;
			rightPanelConstraints.gridy = 0;
			rightPanelConstraints.weighty = 1.0;
		rightPanel.add(innerRightPanel);
		this.add(rightPanel, rightPanelConstraints);
	}

	public void menuEventListeners(){

		for (JButton actionable : actionableButtons){
			String action = parseAction(actionable.toString());
			actionable.addActionListener(new ActionListener(){
				public void actionPerformed(ActionEvent e){
					switch (action){
						case "Process Images" :
							showImagePreProcessing();
							break;
						case "About Me":
							showAboutMesection();
							resultsMessageDialog(true, "Hello, World");
							break;
						default:
							System.out.println("Hello, World");
					}
				}
			});
		}

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
	}

	public void clearPanel(JComponent panel){
		panel.removeAll();
		panel.revalidate();
		panel.repaint();
		innerRightPanel.setPreferredSize(new Dimension(rightPanel.getWidth()-100, rightPanel.getHeight()-50));
	}
	public void validateView(){
		rightPanel.validate();
	}

	public void showImagePreProcessing(){
		try{
			tinyPngURI = new URI("http://tinypng.com");
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		}
		clearPanel(innerRightPanel);
		// hideHTMLExamples();

		GridBagConstraints preProcessCon = new GridBagConstraints();
			preProcessCon.fill = GridBagConstraints.HORIZONTAL;
			preProcessCon.gridx = 0;
			preProcessCon.gridy = 0;
			preProcessCon.weightx = 1;
			preProcessCon.insets = new Insets(0,0,20,60);
		innerRightPanel.add(compressImagesReminder, preProcessCon);
			preProcessCon.gridy = 1;
		innerRightPanel.add(useTinyPng, preProcessCon);
			preProcessCon.gridy = 2;
			preProcessCon.weightx = 0;
		innerRightPanel.add(startImageProcessing, preProcessCon);

		validateView();
	}

	public void showAboutMesection(){
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
		innerRightPanel.add(aboutMeTextEditor, aboutMeTextEditorC);

		
		// GridBagConstraints helpLabelC = new GridBagConstraints();
		// 	helpLabelC.weightx = 0.5;			
		// 	helpLabelC.gridx = 0; 
		// 	helpLabelC.gridy = 4;
		// 	helpLabelC.insets = new Insets(30,40,0,10);
		// innerLeftPanel.add(htmlHelpLabel, helpLabelC);

		// GridBagConstraints helpDropDownC = new GridBagConstraints();
		// 	helpDropDownC.weightx = 0.5;			
		// 	helpDropDownC.gridx = 0; 
		// 	helpDropDownC.gridy = 5;
		// 	helpDropDownC.insets = new Insets(10,40,0,10);
		// innerLeftPanel.add(helpDropDown, helpDropDownC);
		

		// GridBagConstraints spanExampleC = new GridBagConstraints();
		// 	spanExampleC.fill = GridBagConstraints.HORIZONTAL;
		// 	spanExampleC.weightx = 0.5;			
		// 	spanExampleC.gridx = 0; 
		// 	spanExampleC.gridy = 6;
		// 	spanExampleC.ipady = 10;
		// 	spanExampleC.insets = new Insets(10,5,0,0);
		// innerLeftPanel.add(spanExample, spanExampleC);
		validateView();
		// getAboutMeText();
	}


	public void resultsMessageDialog(boolean success, String msg){
		String message = !msg.isEmpty() ? msg : "Unknown Error!";
		if (success){
			JOptionPane.showMessageDialog(this, message, "Success", JOptionPane.INFORMATION_MESSAGE);
		} else {
			JOptionPane.showMessageDialog(this, message, "Error", JOptionPane.ERROR_MESSAGE);
		}
	}


}