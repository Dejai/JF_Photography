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

			JButton processImages = new JButton("Process Images");
			JButton aboutMe = new JButton("About Me");
		
		// Right Side
			JPanel rightPanel = new JPanel(new FlowLayout());
			JPanel innerRightPanel = new JPanel(new GridBagLayout());

			JLabel getStartedLabel = new JLabel("Click on a menu option to get started.");


			JLabel compressImagesReminder = new JLabel("<html><p>Remember to compress your images!</p></html>");
			JButton useTinyPng = new JButton("<html><span id='useTinyPNG'></span><font color='blue'><strong>Click here to go to TinyPng.com</strong></font></html>");
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
				JLabel htmlHelpLabel = new JLabel("How To Style the Text");
				// JComboBox<String> htmlHelpDropdown;
				HTMLExamples html = new HTMLExamples();
				JComboBox<String> htmlHelpDropdown = new JComboBox<String>(html.examples);
				JLabel htmlExampleArea = new JLabel("");

		// Containers of Components
			JComponent [] actionableButtons = { processImages, aboutMe, useTinyPng, toggleAboutMeEditor, htmlHelpDropdown };
			// JComponent [] actionableButtons = { processImages, aboutMe, useTinyPng, toggleAboutMeEditor };
			JLabel [] subheaders= {htmlHelpLabel};
			JLabel [] headers= {menuLabel, processingNow, editAboutMe, getStartedLabel, compressImagesReminder };
			JComponent [] leftSide = {leftPanel, innerLeftPanel, bottomPanel};
			JComponent [] rightSide = {rightPanel, innerRightPanel };


	public Frames( String title ){

		super ( title );
		setSize(800, 500);
		setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
		setLayout(new GridBagLayout());

		Listeners ll = new Listeners (this);
		initFrame(ll.opSystem);

	}

	public void initFrame(String opSystem){

		//  Style & Text
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
		poweredByLabel.setText(String.format("<html><div style='color:white;'>Powered By: <span style='font-weight:bold; font-style:italics'>%s</span></div></html>", opSystem));


		// Adding Components to panels
		innerLeftPanel.add(menuLabel, new GridBagParams("menuLabel"));
		innerLeftPanel.add(processImages, new GridBagParams("processImagesButton"));
		innerLeftPanel.add(aboutMe, new GridBagParams("aboutMeButton"));
		innerLeftPanel.add(htmlHelpLabel, new GridBagParams("htmlHelpLabel"));
		htmlHelpLabel.setVisible(false);
		innerLeftPanel.add(htmlHelpDropdown, new GridBagParams("htmlHelpDropdown"));
		htmlHelpDropdown.setVisible(false);
		innerLeftPanel.add(htmlExampleArea, new GridBagParams("htmlExampleArea"));
		htmlExampleArea.setVisible(false);

		innerRightPanel.add(getStartedLabel, new GridBagParams("getStartedLabel"));

		// Adding panels to the frame
		leftPanel.add(innerLeftPanel);
		this.add(leftPanel, new GridBagParams("leftPanel"));
		
		bottomPanel.add(poweredByLabel);
		this.add(bottomPanel, new GridBagParams("bottomPanel"));

		rightPanel.add(innerRightPanel);
		this.add(rightPanel, new GridBagParams("rightPanel"));
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