import java.util.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class scanPhotos{

	public static void main(String args []){

		//scanDirectory("../images/slideshow");
		// System.out.println("............................");
		//scanDirectory("../images/gallery");

		try {
			byte[] buffer = new byte[1000];
			// FileInputStream inputStream = new FileInputStream("../index.html");
			FileInputStream inputStream = new FileInputStream(fileName);
			// read fills buffer with data and returns
            // the number of bytes read (which of course
            // may be less than the buffer size, but
            // it will never be more).
            int total = 0;
            int nRead = 0;
            while((nRead = inputStream.read(buffer)) != -1) {
                // Convert to String so we can display it.
                // Of course you wouldn't want to do this with
                // a 'real' binary file.
                System.out.println(new String(buffer));
                total += nRead;
            } 
			// Always close files.
            inputStream.close();        

            System.out.println("Read " + total + " bytes");
        }
        catch(FileNotFoundException ex) {
            System.out.println(
                "Unable to open file '" + 
                fileName + "'");                
        }
        catch(IOException ex) {
            System.out.println(
                "Error reading file '" 
                + fileName + "'");                  
            // Or we could just do this: 
            // ex.printStackTrace();
        }

	}

	public static void scanDirectory(String directoryPath){
		File dir = new File(directoryPath);
		System.out.printf("Scanning: %s\n", directoryPath);

		File list2[] = dir.listFiles();
		for (int x = 0; x < list2.length; x++){
			if (list2[x].isDirectory()){
				System.out.printf("Diving into: %s\n", list2[x]);
				scanDirectory(list2[x].toString());
				// System.out.printf("%s is a directory: %s\n", list2[x], directoryPath.concat(list2[x].getName()));
			} else{
				// System.out.printf("%s is a file: %s\n", list2[x], directoryPath.concat(list2[x].getName()));
				try{
				    // File  f = new File(path.concat(list[x]));
					// BufferedImage image = ImageIO.read(new File(path.concat(list[x])));
					BufferedImage image = ImageIO.read(list2[x]);
					System.out.println("Width: " + image.getWidth());
			    	System.out.println("Height: " + image.getHeight());
				} catch (Exception ex){
				    ex.printStackTrace();
				}
			}
		} System.out.println("End of Scan ......................................");
	}

	public static void populateJSON(){
		
	}

	//public void generateConfigFile();
}