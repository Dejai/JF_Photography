import java.util.*;


public class ThreadControl implements Runnable{

	private String mtr; 
	public ThreadControl(String methodToRun){
		mtr = methodToRun;	
	}
	public void run(){
		switch(mtr){
			case "show":
				ConfigTool.showImageProcessing();
				break;
			case "start":
				ConfigTool.startImageProcessing();
				break;
			default:
				ConfigTool.showImageProcessing();
		}
    }

}