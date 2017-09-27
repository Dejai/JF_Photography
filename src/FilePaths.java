import java.util.*;
import java.net.*;
import java.io.*;

public class FilePaths{

	protected String opSystem;
	protected String opSystemFull;
	protected String aboutMeFilePath;
	protected String dimensionsFilePath;
	protected String albumsJSONFilePath;
	protected String slideshowJSONFilePath;
	protected String gifsPath;
	protected String galleryDirectoryPath;
	protected String slideshowDirectoryPath;
	protected String separator; 
	protected String oopsImg; 
	protected String successProcessingImg; 

	private static ArrayList<String> gifs = new ArrayList<String>();


	public FilePaths(){

		opSystemFull =  System.getProperty("os.name");
		opSystem = opSystemFull.toLowerCase().indexOf("mac") >= 0 ? "mac" : "windows" ;
		updateFilePermissions(opSystem);
		setFilePaths(opSystem);
		getGIFS();
	}

	public void updateFilePermissions(String os){
		try{
			if (os == "windows"){
				System.out.println("It looks like it might not be needed on windows.");
			} else if (os == "mac"){
				String cmd = "open ./src/filePermissions.command";
				Runtime run = Runtime.getRuntime();
				Process pr = run.exec(cmd);
			}
		} catch (Exception ex){
			ConfigTool.resultsMessageDialog(false, ex.getMessage());
		}
		
	}

	// Consolidate the two different set functions below
	public void setFilePaths(String os){
		aboutMeFilePath = os == "windows" ? "config\\aboutMe.txt" : "config/aboutMe.txt";

		dimensionsFilePath = os == "windows" ? "config\\dimConfig.txt" : "config/dimConfig.txt";

		albumsJSONFilePath = os == "windows" ? "config\\albumsJSON.txt" : "config/albumsJSON.txt";

		slideshowJSONFilePath = os == "windows" ? "config\\slideshowJSON.txt" : "config/slideshowJSON.txt";

		galleryDirectoryPath = os == "windows" ? "images\\gallery" : "images/gallery";

		slideshowDirectoryPath = os == "windows" ? "images\\slideshow" : "images/slideshow";

		gifsPath = os == "windows" ? "images\\assets\\gifs\\" : "images/assets/gifs/";

		separator = os == "windows" ? "\\" : "/";

		oopsImg = os == "windows" ? "images\\assets\\icons\\oops2.png" : "images/assets/icons/oops2.png";

		successProcessingImg = os == "windows" ? "images\\assets\\icons\\successProcessing.png" : "images/assets/icons/successProcessing.png";

		
	}


	public void getGIFS(){
		try{
			File gif = new File(this.gifsPath);
			File [] gifList = gif.listFiles();
			for (int x = 0; x < gifList.length; x++){
				if (gifList[x].getPath().contains(".gif")){
					gifs.add(gifList[x].getPath());
				}
			}
		} catch (Exception ex){
		    // ex.printStackTrace();
		}
	}
	public String getRandomGIF(){
		try{
			Random rand = new Random(); 
			String procImg = gifs.get(rand.nextInt(gifs.size()));
			return procImg;
		} catch(Exception ex) {
			// ex.printStackTrace();
			return null; 
		}
	}

	
}