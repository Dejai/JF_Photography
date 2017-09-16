import java.util.*;
import java.net.*;
import java.io.*;

public class UpdateFilePermissions{

	public static void main (String [] args){
		try{
			// String cmd = "ls -al ../config/";
			String cmd = "sudo chmod 666 ../config/*.txt";
			Runtime run = Runtime.getRuntime();
			Process pr = run.exec(cmd);
			pr.waitFor();
			BufferedReader buf = new BufferedReader(new InputStreamReader(pr.getInputStream()));
			String line = "";
			while ((line=buf.readLine())!=null) {
			System.out.println(line);
			}
			// Runtime cmdLine = Runtime.getRuntime();
			// // Process pr = cmdLine.exec("chmod 666 ../config/*.txt");
			// Process pr = cmdLine.exec("../config/updateFilePermission.sh");
		} catch (Exception ex){
			// ConfigTool.resultsMessageDialog(false, ex.getMessage());
			System.out.println(ex.getMessage());
		}
	}
}