import java.util.*; 
import java.io.*; 
import javax.swing.*;

public class NewMain {

	public static void main (String args []){

		FilePaths filePaths = new FilePaths();

		Frames mainFrame = new Frames("Managing Config Files", filePaths.opSystemFull);
		mainFrame.setVisible(true);

	}

	
}