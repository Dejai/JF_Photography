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
			// JFrame mainFrame = new JFrame("Managing Config Files");
			JPanel contentPane = new JPanel();

		// Bottom Section
			JPanel bottomPanel = new JPanel(new FlowLayout());
			JLabel poweredByLabel = new JLabel("");

		
		//Left Side 
			JPanel leftPanel = new JPanel(new FlowLayout());
			JPanel innerLeftPanel = new JPanel(new GridBagLayout());

			JLabel menuLabel = new JLabel("Menu: ");

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


	public Frames( String title, String opSystem){
		super ( title ); 
		setSize(800, 500);
		setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
		setLayout(new GridBagLayout());
		initFrame(opSystem);

	}

	public void initFrame(String opSystem){

		JLabel [] subheaders= {htmlHelpLabel};
		for (JLabel subH : subheaders){
			subH.setFont(new Font("Arial", Font.BOLD, 16));
		}

		JLabel [] headers= {menuLabel, processingNow, editAboutMe, getStartedLabel, compressImagesReminder };
		for (JLabel xL : headers){
			xL.setFont(new Font("Arial", Font.BOLD, 22));
		}

		JComponent [] leftSide = {leftPanel, innerLeftPanel, bottomPanel};
		for (JComponent left : leftSide){
			left.setBackground(Color.LIGHT_GRAY);
		}
		this.getContentPane().setBackground(Color.GRAY);
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
			processImagesConstraints.weightx = 0.5;				
			processImagesConstraints.gridx = 0; 
			processImagesConstraints.gridy = 1;
			processImagesConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(processImages, processImagesConstraints);

		GridBagConstraints aboutMeConstraints = new GridBagConstraints();
			aboutMeConstraints.weightx = 0.5;				
			aboutMeConstraints.gridx = 0; 
			aboutMeConstraints.gridy = 2;
			aboutMeConstraints.insets = new Insets(10,40,0,0); 
		innerLeftPanel.add(aboutMe, aboutMeConstraints);

		

		GridBagConstraints getStartedConstraints = new GridBagConstraints();
			getStartedConstraints.insets = new Insets(40,0,0,0); 
		innerRightPanel.add(getStartedLabel, getStartedConstraints);




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

		// Processing Images
		this.processImages.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				// JOptionPane.showMessageDialog(this, "Hello, World", "Test", JOptionPane.INFORMATION_MESSAGE);
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
		JOptionPane.showMessageDialog(this, "Hello, World", "Test", JOptionPane.INFORMATION_MESSAGE);
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

	public void resultsMessageDialog(boolean success, String msg){
		String message = !msg.isEmpty() ? msg : "Unknown Error!";
		if (success){
			JOptionPane.showMessageDialog(this, message, "Success", JOptionPane.INFORMATION_MESSAGE);
		} else {
			JOptionPane.showMessageDialog(this, message, "Error", JOptionPane.ERROR_MESSAGE);
		}
	}


}