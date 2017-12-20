import java.util.*;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.File;


public class WriteToFiles{

	public static boolean writeUpdatedDimensions(String fileParam, String portraitDim, String squareDim){
		try{
			BufferedWriter writeDim = new BufferedWriter(new FileWriter(fileParam));
			writeDim.write(String.format("portrait=%s",portraitDim));
			writeDim.newLine();
			writeDim.write(String.format("square=%s",squareDim));
			writeDim.newLine();
			writeDim.close();
			return true;
		} catch (Exception ex){
		   	Main.resultsMessageDialog(false, ex.getMessage());
			return false; 
		}
	}

	public static boolean writeJSONFile(String fileParam, ArrayList<Album> albumArrayList){
		try{
			File fp = new File(fileParam);
			fp.setWritable(true);
			BufferedWriter jsonOUT = new BufferedWriter(new FileWriter(fp, false));

			jsonOUT.write("");
			jsonOUT.write("{");
			jsonOUT.newLine();
			// int albumCount = 0;
			for (Album singleAlbum : albumArrayList){
				String openJSON = String.format( "\"" + singleAlbum.albumName + "\" : {"
					// + "\"name\" :\"" + singleAlbum.albumName + "\","
				  +  "\"folderName\" :\"" + singleAlbum.albumName + "\","
				  +  "\"coverImg\" :\"/" + singleAlbum.coverImage + "\","
				  +  "\"images\" : [");
				jsonOUT.write(openJSON);
				jsonOUT.newLine();

				// int pictCount = 0;
				// for (Picture yx : singleAlbum.pictures){
				// String picsArr [] = singleAlbum.pics.keySet().toArray(new String[singleAlbum.pics.size()]);
				// Collections.sort(singleAlbum.pictures);
				for (Picture yx : singleAlbum.pictures){
					String imgJSON = String.format("{"
						+ "\"path\" :\"/" + yx.path.replace("\\", "/") + "\","
						+ "\"width\" : " + yx.width  + " ,"
						+ "\"height\" : " + yx.height + " ,"
						+ "\"dimension\" : \"" + yx.dimension + "\" ");
					jsonOUT.write(imgJSON);
					jsonOUT.newLine();
					String commaOption = (singleAlbum.pictures.indexOf(yx) == singleAlbum.pictures.size()-1) ? "}]" : "},";
					jsonOUT.write(String.format(commaOption));
					jsonOUT.newLine();
					// if (pictCount++ == singleAlbum.pictures.size()-1){
					// 	jsonOUT.write(String.format("}]"));
					// 	jsonOUT.newLine();
					// } else{
					// 	jsonOUT.write(String.format("},"));
					// 	jsonOUT.newLine();
					// }
				}
				String commaOption2 = ( albumArrayList.indexOf(singleAlbum) == albumArrayList.size()-1 ) ? "}" : "},";
				jsonOUT.write(String.format(commaOption2));
				jsonOUT.newLine();
				// if (albumCount++ == albumArrayList.size()-1){
				// 	jsonOUT.write(String.format("}"));
				// 	jsonOUT.newLine();
				// } else {
				// 	jsonOUT.write(String.format("},"));
				// 	jsonOUT.newLine();
				// }
			}
			jsonOUT.write("}");
			jsonOUT.close();
			return true;
		} catch (Exception ex){
		    // Main.resultsMessageDialog(false, ex.getMessage());
		    return false;

		}
	}

	public boolean writeAboutMeText(String fileParam, String newText){
		try{
			BufferedWriter writeAboutMe = new BufferedWriter(new FileWriter(fileParam));
			writeAboutMe.write(newText);
			writeAboutMe.close();
			return true;
		} catch (Exception ex){
		    Main.resultsMessageDialog(false, ex.getMessage());
			return false; 
		}
	}


	
}