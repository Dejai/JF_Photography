import java.util.*;


public class ThreadControl implements Runnable{

	private String mtr; 
	public ThreadControl(String methodToRun){
		mtr = methodToRun;	
	}
	public void run(){
		switch(mtr){
			case "show":
				Main.showImageProcessing();
				break;
			case "start":
				Main.startImageProcessing();
				break;
			default:
				Main.showImageProcessing();
		}
    }

}