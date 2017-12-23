import java.util.*;
import java.awt.*;

public class GridBagParams extends GridBagConstraints {

	GridBagParams(String type){
		super ();
		returnConstraints(type);
	}

	public void returnConstraints(String type){
		switch( type ){
			case "menuLabel":
				this.fill = GridBagConstraints.HORIZONTAL;
				this.weightx = 0.5;				
				this.gridx = 0; 
				this.gridy = 0;
				this.ipadx = 50;
				this.insets = new Insets(10,5,0,10);  //top padding
				break;
			case "processImagesButton":
				this.weightx = 0.5;				
				this.gridx = 0; 
				this.gridy = 1;
				this.insets = new Insets(10,40,0,0);
				break;
			case "aboutMeButton" :
				this.weightx = 0.5;				
				this.gridx = 0; 
				this.gridy = 2;
				this.insets = new Insets(10,40,0,0); 
				break;
			case "startProcessingImagesButton":
				this.insets = new Insets(40,0,0,0); 
				break;
			default:
				System.out.println("Did not catch");

		}
	}
}