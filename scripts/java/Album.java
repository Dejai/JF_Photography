import java.util.*;

class Album {

	public String albumName; 
	public String folderName; 
	public String coverImage; 
	public boolean hasCoverImage;
	public HashMap<String, String> pics = new HashMap<String, String>();

	public Album(String name){
		albumName = name;
		hasCoverImage = false;
	}

	public void setCoverImage(String img){
		String webPathImg = img.replace("\\", "/");
		coverImage = webPathImg;
		hasCoverImage = true; 
	}
}