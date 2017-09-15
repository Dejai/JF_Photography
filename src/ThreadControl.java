import java.util.*;


public class ThreadControl implements Runnable{

	private String mtr; 
	public ThreadControl(String methodToRun){
		mtr = methodToRun;	
	}
	public void run(){
		switch(mtr){
			case "show":
				JF.showImageProcessing();
				break;
			case "start":
				JF.startImageProcessing();
				break;
			default:
				JF.showImageProcessing();
		}
    }

}