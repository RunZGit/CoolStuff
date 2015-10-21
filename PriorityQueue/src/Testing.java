import static org.junit.Assert.*;

import org.junit.AfterClass;
import org.junit.Test;

public class Testing {
	
	private static int points = 0;

	@Test
	public void testAddandtoArray(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		assertTrue(q.add(4));
		assertTrue(q.add(2));
		try {
			q.add(null);
			fail("Did not throw NullPointerException");
		} catch (Exception e){
			if (!(e instanceof NullPointerException)) {
				fail("Did not throw NullPointerException");				
			}
		}
		Object[] a = q.toArray();
		assertEquals(2,a[0]);
		assertEquals(2,a[1]);
		assertEquals(3,a[2]);
		assertEquals(5,a[3]);
		assertEquals(4,a[4]);
		points+=7;
	}
	

	
	@Test
	public void testToArray(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		Object[] a = q.toArray();
		assertEquals(3, a.length);
		a[1] = 4;
		Object[] b = q.toArray();
		assertFalse(a[1].equals(b[1]));
		points+=2;
	}

	@Test
	public void testOffer(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.offer(3));
		assertTrue(q.offer(5));
		assertTrue(q.offer(2));
		assertTrue(q.offer(4));
		assertTrue(q.offer(2));
		try {
			q.add(null);
			fail("Did not throw NullPointerException");
		} catch (Exception e){
			if (!(e instanceof NullPointerException)) {
				fail("Did not throw NullPointerException");				
			}
		}
		Object[] a = q.toArray();
		assertEquals(2,a[0]);
		assertEquals(2,a[1]);
		assertEquals(3,a[2]);
		assertEquals(5,a[3]);
		assertEquals(4,a[4]);
		points+=2;
	}
	
	@Test
	public void testPeek(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertEquals(null ,q.peek());		
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		assertEquals(new Integer(2) ,q.peek());	
		points += 2;
	}
	
	@Test
	public void testClear(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		q.clear();
		assertEquals(0,q.toArray().length);
		points += 2;
	}

	@Test
	public void testContains(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		assertTrue(q.contains(2));
		assertFalse(q.contains(7));
		points += 2;
	}
	
	@Test
	public void testSize(){	
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		assertEquals(3,q.size()); //q.toArray().length);
		points += 2;
	}

	@Test
	public void testToArray2(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.add(3));
		assertTrue(q.add(5));
		assertTrue(q.add(2));
		Number[] y = q.toArray(new Number[0]);
		assertEquals(3, y.length);
		points += 2;
	}
	
	@Test
	public void testPoll(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.offer(3));
		assertTrue(q.offer(5));
		assertTrue(q.offer(2));
		assertTrue(q.offer(4));
		assertTrue(q.offer(2));
		assertEquals(new Integer(2),q.poll());
		assertEquals(new Integer(2),q.poll());
		assertEquals(new Integer(3),q.poll());
		assertEquals(new Integer(4),q.poll());
		assertEquals(new Integer(5),q.poll());
		assertEquals(null,q.poll());
		points += 5;
	}
	
	@Test
	public void testRemove(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		assertTrue(q.offer(3));
		assertTrue(q.offer(5));
		assertTrue(q.offer(2));
		assertTrue(q.offer(4));
		assertTrue(q.offer(2));
		assertFalse(q.remove(new Integer(7)));
		assertTrue(q.remove(new Integer(2)));
		assertTrue(q.remove(new Integer(4)));
		assertFalse(q.remove(new Integer(4)));
		Integer[] temp = q.toArray(new Integer[0]);
		assertEquals(3, temp.length);
		Integer[] test = {2, 5, 3};
		for (int i = 0; i < temp.length; i++){
			assertEquals(test[i], temp[i]);
		}
		points += 5;
	}
	
	@Test
	public void testLogBehavior(){
		PriorityQueue<Integer> q = new PriorityQueue<Integer>();
		int nums = 3000000;
		for (int i = 0; i < nums; i++){
			q.offer((int) (Math.random() * nums));
		}
		assertEquals(nums, q.size());
		int end = q.size();
		for (int i = 0; i < end; i++){
			q.poll();
		}
		assertEquals(0, q.size());
		points += 19;
	}
	
	@AfterClass
	public static void testNothing(){
		System.out.println("Points: " + points + "/50");
	}

}