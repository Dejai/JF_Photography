import java.util.*;

public class FilePaths{

	public String aboutMeFilePath;
	public String dimensionsFilePath;
	public String gifsPath;
	public String galleryPath;
	public String slideshowPath;
	public FilePaths(String opSystem){
		if (opSystem == "windows"){
			setWindowsPaths();
		} else if (opSystem == "mac"){
			setMacPaths();
		}
	}

	public void setWindowsPaths(){
		aboutMeFilePath = "config\\aboutMe.txt";
		dimensionsFilePath = "config\\dimConfig.txt";
		galleryPath = "images\\gallery\\";
		slideshowPath = "images\\slideshow\\";

		gifsPath = "images\\assets\\gifs\\";


	}

	public void setMacPaths(){
		aboutMeFilePath = "config/aboutMe.txt";
		dimensionsFilePath = "config/dimConfig.txt";
		galleryPath = "images/gallery/";
		slideshowPath = "images/slideshow/";

		gifsPath = "images/assets/gifs/";
		
	}

	
}