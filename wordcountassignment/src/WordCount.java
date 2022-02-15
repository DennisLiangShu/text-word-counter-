import java.lang.module.FindException;
import java.util.*;
import java.io.*;

public class WordCount {
   //minimum number of occurrences needed to be printed
   public static final int OCCURRENCES = 2000;

   public static void main(String[] args) throws FileNotFoundException {
      System.out.println("This program displays the most");
      System.out.println("frequently occurring words from");
      System.out.println(" the novel Moby Dick.");
      System.out.println();

      Scanner in = new Scanner(new File("mobydick.txt"));

      Map<String, Integer> wordCount = new TreeMap<>();
      wordCount = getCountMap(in);
      System.out.println(wordCount);

   }

   public static Map<String, Integer> getCountMap(Scanner in) {
      Map<String, Integer> wordCountMap = new TreeMap<>();
      while (in.hasNext()) {
         String word = in.next().toLowerCase();
         if(wordCountMap.containsKey(word)) {
            int count = wordCountMap.get(word);
            wordCountMap.put(word, count+1);
         } else {
            wordCountMap.put(word, 1);
         }
      }
      return wordCountMap;
   }
}
