import java.io.BufferedReader;
import java.io.FileReader;

public class Main {

	public static void main(String[] args)  {
		 String fileName="sha_input.txt";
		 String message="";
		try{

	          //Create object of FileReader
	          FileReader inputFile = new FileReader(fileName);

	          //Instantiate the BufferedReader Class
	          BufferedReader bufferReader = new BufferedReader(inputFile);

	          //Variable to hold the one line data
	          String line;

	          // Read file line by line and print on the console
	          while ((line = bufferReader.readLine()) != null)   {
	           message=line;
	          }
	          //Close the buffer reader
	          bufferReader.close();
	       }catch(Exception e){
	          System.out.println("Error while reading file line by line:" + e.getMessage());                      
	       }
		
		 SHA1 s = new SHA1();
		 long startTime = System.nanoTime();
		 System.out.println(s.encrypt(message));
		 long endTime = System.nanoTime();
		 long duration = (endTime - startTime)/1000000;
		 System.out.println("Total time took is "+duration+"ms");
	}

}
