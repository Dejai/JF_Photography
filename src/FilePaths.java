import java.util.*;
import java.net.*;
import java.io.*;

public class FilePaths{

	protected String opSystem;
	protected String aboutMeFilePath;
	protected String dimensionsFilePath;
	protected String gifsPath;
	protected String galleryPath;
	protected String slideshowPath;
	protected String separator; 

	private static ArrayList<String> gifs = new ArrayList<String>();


	public FilePaths(){

		opSystem = System.getProperty("os.name").toLowerCase().indexOf("win") >= 0 ? "windows" : "mac" ;
		
		updateFilePermissions(opSystem);
		
		setFilePaths(opSystem);

		// if (opSystem == "windows"){
		// 	setWindowsPaths();
		// } else if (opSystem == "mac"){
		// 	setMacPaths();
		// }
		
		getGIFS();
	}

	public void updateFilePermissions(String os){
		try{
			if (os == "windows"){
				System.out.println("Friendly advice .... Fix this!");
			} else if (os == "mac"){
				String cmd = "open ./filePermissions.command";
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

		galleryPath = os == "windows" ? "images\\gallery\\" : "images/gallery/";

		slideshowPath = os == "windows" ? "images\\slideshow\\" : "images/slideshow";

		gifsPath = os == "windows" ? "images\\assets\\gifs\\" : "images/assets/gifs/";

		separator = os == "windows" ? "\\" : "/";
	}

	// public void setWindowsPaths(){
	// 	aboutMeFilePath = "config\\aboutMe.txt";
	// 	dimensionsFilePath = "config\\dimConfig.txt";
	// 	galleryPath = "images\\gallery\\";
	// 	slideshowPath = "images\\slideshow\\";
	// 	gifsPath = "images\\assets\\gifs\\";
	// 	separator = "\\";


	// }

	// public void setMacPaths(){
	// 	aboutMeFilePath = "config/aboutMe.txt";
	// 	dimensionsFilePath = "config/dimConfig.txt";
	// 	galleryPath = "images/gallery/";
	// 	slideshowPath = "images/slideshow";
	// 	gifsPath = "images/assets/gifs/";
	// 	separator = "/";		
	// }


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