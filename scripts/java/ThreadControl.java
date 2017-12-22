import java.util.*;


public class ThreadControl implements Runnable{

	private String mtr; 
	public ThreadControl(String methodToRun){
		mtr = methodToRun;	
	}
	public void run(){
		switch(mtr){
			case "show":
				Main.showImageProcessingSection();
				break;
			case "start":
				Main.processImages();
				break;
			default:
				Main.showImageProcessingSection();
		}
    }

}