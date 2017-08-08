import java.io.*;

public class Test2 {
    public static void main(String [] args) {

        // The name of the file to open.
        String fileName = "../index.html";
        String newFile = "./temp.html";

        // This will reference one line at a time
        String line = null;

        try {
            // FileReader reads text files in the default encoding.
            FileReader fileReader = new FileReader(fileName);
            FileWriter fileWriter = new FileWriter(newFile);

            // Always wrap FileReader in BufferedReader.
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

            while((line = bufferedReader.readLine()) != null) {
                if (line.contains("slideshowImagesContainerzz")){
                    bufferedWriter.write(line);
                    bufferedWriter.newLine();
                    int x = 0; 
                    while (!(line = bufferedReader.readLine()).contains("</div>")){
                        x++;
                        bufferedWriter.write("<img>Image Details Go Here </img>");
                        bufferedWriter.newLine();
                    }
                    bufferedWriter.write(line);
                    bufferedWriter.newLine();
                    System.out.printf("There are %d images!\n", x);
                } else if (line.contains("slideshow_leftButton")){
                    bufferedWriter.write(line);
                    bufferedWriter.newLine();
                    int y = 0;
                    while (!(line = bufferedReader.readLine()).contains("slideshow_rightButton")){
                        y++;
                        bufferedWriter.write("<p>Add a new indicator for each image </p>");
                        bufferedWriter.newLine();
                    }
                    bufferedWriter.write(line);
                    bufferedWriter.newLine();
                    System.out.printf("And there are %d indicators!\n", y);
                } else {
                    bufferedWriter.write(line);
                    bufferedWriter.newLine();
                }
                // System.out.println(line);
            }   

            // Always close files.
            bufferedReader.close();
            bufferedWriter.close();    
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
}