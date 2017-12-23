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
import java.lang.*;

public class Listeners extends JFrame {

	protected String opSystem;
	private FilePaths filePaths;

	private Frames theMainFrame;

	private String plainText;



	public Listeners(Frames frame){
		filePaths = new FilePaths();
		opSystem = filePaths.opSystemFull;
		
		theMainFrame = frame;


		for (JComponent actionable : theMainFrame.actionableButtons){
			String action = parseAction(actionable.toString());				
			// System.out.printf("Breakdown:\n%s\n%s\n\n", actionable, action);
			if (actionable instanceof JButton){
				addListeners( (JButton) actionable, action );
			} else  if (actionable instanceof JComboBox){
				addListeners( (JComboBox) actionable, action );
			}
		}
	}

	// Adding Listeners for JButtons
	// @Overload
	public void addListeners(JButton button, String action){ 
		button.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				switchAction(action);
			}
		});
	}

	// Adding Listeners for JComboBox
	// @Overload
	public void addListeners(JComboBox box, String action){ 
		box.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				switchAction(action);
			}
		});
	}

	public void switchAction(String action){
		switch (action){
			case "Process Images" :
				showImagePreProcessing();
				break;
			case "About Me":
				showAboutMesection();
				break;
			case "useTinyPNG":
				openTinyPNGSite();
				break;
			case "Preview":
			case "Edit":
				toggleAboutMeEditor();
				break;
			case "htmlHelpDropdown":
				selectHTMLExamples();
				break;
			default:
				System.out.println(action);
				// System.out.println(actionable.toString());
		}
	}

// General Processes
	public static String parseAction(String value){
		int firstIndex = value.indexOf("text=") > 0 ? value.indexOf("text=") : 0;
		String firstSub = value.substring(firstIndex); 
		boolean isHTML = firstSub.indexOf("<html>") > 0 ? true : false;
		boolean isComboBox = firstSub.indexOf("JComboBox") > 0 ? true : false;
		String action;
		if (isHTML){
			action = firstSub.substring(firstSub.indexOf("'")+1, firstSub.indexOf("'>"));
		} else if (isComboBox){
			action = "htmlHelpDropdown";
		} else {
			action = firstSub.substring(0, firstSub.indexOf(",")).split("=")[1];
		}
		return action;
	}

	public void clearPanel(JComponent panel){
		theMainFrame.htmlHelpLabel.setVisible(false);
		theMainFrame.htmlHelpDropdown.setVisible(false);
		theMainFrame.htmlExampleArea.setVisible(false);
		panel.removeAll();
		panel.revalidate();
		panel.repaint();
		theMainFrame.innerRightPanel.setPreferredSize(new Dimension(theMainFrame.rightPanel.getWidth()-100, theMainFrame.rightPanel.getHeight()-50));
	}
	public void validateView(){
		theMainFrame.rightPanel.validate();
	}

//  Image Processes
	public void showImagePreProcessing(){
		clearPanel(theMainFrame.innerRightPanel);
		// hideHTMLExamples();
		theMainFrame.innerRightPanel.add(theMainFrame.compressImagesReminder, new GridBagParams("compressImagesReminder"));
		theMainFrame.innerRightPanel.add(theMainFrame.useTinyPng, new GridBagParams("useTinyPng"));
		theMainFrame.innerRightPanel.add(theMainFrame.startImageProcessing, new GridBagParams("startImageProcessing"));
		validateView();
	}

	public void openTinyPNGSite(){
		if (Desktop.isDesktopSupported()) {
			try {
				URI tinyPngURI = new URI("http://tinypng.com");
	        	Desktop.getDesktop().browse(tinyPngURI);
		   	} catch (URISyntaxException ex){
		   		System.out.println(ex.getMessage());
		   		theMainFrame.resultsMessageDialog(false, ex.getMessage());
			} catch (IOException ex) { /* TODO: error handling */ 
		   		theMainFrame.resultsMessageDialog(false, ex.getMessage());
		   	} catch (Exception ex){
		   		theMainFrame.resultsMessageDialog(false, ex.getMessage());
			}
		} else { 
			theMainFrame.resultsMessageDialog(false, "Desktop access is not supported. Cannot open the site from here. Go to www.tinypng.com");
		}
	}

	public void showImagePreProcessing(){
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


// About Me Processes

	public void selectHTMLExamples(){
		String example = theMainFrame.htmlHelpDropdown.getSelectedItem().toString();
		theMainFrame.htmlExampleArea.setText(HTMLExamples.htmlExamples.get(example));
	}

	public void showAboutMesection(){
		clearPanel(theMainFrame.innerRightPanel);
		theMainFrame.innerRightPanel.add(theMainFrame.editAboutMe, new GridBagParams("editAboutMe"));
		theMainFrame.innerRightPanel.add(theMainFrame.toggleAboutMeEditor, new GridBagParams("toggleAboutMeEditor"));
		theMainFrame.innerRightPanel.add(theMainFrame.saveAboutMe, new GridBagParams("saveAboutMe"));

		theMainFrame.aboutMeTextEditor.setEditable(true);
		theMainFrame.aboutMeTextEditor.setMargin(new Insets(10,10,0,10));
		theMainFrame.innerRightPanel.add(theMainFrame.aboutMeTextEditor, new GridBagParams("aboutMeTextEditor"));
		
		theMainFrame.htmlHelpLabel.setVisible(true);
		theMainFrame.htmlHelpDropdown.setVisible(true);
		theMainFrame.htmlExampleArea.setVisible(true);

		theMainFrame.aboutMeTextEditor.setText(FilesCRUD.getAboutMeText("../../config/aboutMe.txt"));
		// getAboutMeText();
	}


	public void toggleAboutMeEditor(){
		try{
			String contentType = theMainFrame.aboutMeTextEditor.getContentType();
			if(contentType == "text/plain"){
				theMainFrame.toggleAboutMeEditor.setText("Edit");
				plainText = theMainFrame.aboutMeTextEditor.getText();
				theMainFrame.aboutMeTextEditor.setBackground(Color.BLACK);
				theMainFrame.aboutMeTextEditor.setContentType("text/html");
				theMainFrame.aboutMeTextEditor.setEditable(false);
				theMainFrame.aboutMeTextEditor.setText(plainText);
			} else {
				theMainFrame.toggleAboutMeEditor.setText("Preview");
				theMainFrame.aboutMeTextEditor.setBackground(Color.WHITE);
				theMainFrame.aboutMeTextEditor.setContentType("text/plain");
				theMainFrame.aboutMeTextEditor.setEditable(true);
				theMainFrame.aboutMeTextEditor.setText(plainText);
			}
		} catch (Exception ex){
			theMainFrame.resultsMessageDialog(false, ex.getMessage());
		}
	}





}