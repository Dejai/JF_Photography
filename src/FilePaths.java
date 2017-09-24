import java.util.*;
import java.net.*;
import java.io.*;

public class FilePaths{

	protected String opSystem;
	protected String opSystemFull;
	protected String aboutMeFilePath;
	protected String dimensionsFilePath;
	protected String gifsPath;
	protected String galleryPath;
	protected String slideshowPath;
	protected String separator; 

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
				// System.out.println("Friendly advice .... Fix this!");
				String cmd = "start .\\filePermissions.bat";
				Runtime run = Runtime.getRuntime();
				Process pr = run.exec(cmd);
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