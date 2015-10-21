import java.util.ArrayList;
import java.util.NoSuchElementException;

/**
 * @author Runzhi Yang 01/06/2015
 * @param <T>
 */
public class PriorityQueue<T extends Comparable<? super T>> extends
		ArrayList<T> {
	private static final long serialVersionUID = 1L;
	private int size = 0;

	/**
	 * Add a element to the queue
	 * 
	 * @param e
	 * @return True or False
	 */
	public boolean offer(T e) {
		return add(e);
	}

	/**
	 * Show the first element of the queue
	 * 
	 * @return T
	 */
	public T peek() {
		if (this.size == 0)
			return null;
		return super.get(0);
	}

	/**
	 * Removes the first element
	 * 
	 * @return T
	 */
	public T poll() {
		if (super.isEmpty())
			return null;
		T minItem = element();
		remove(minItem);
		return minItem;
	}

	/**
	 * Removes the given element
	 * 
	 * @param o
	 * @return T
	 */
	public boolean remove(T o) {
		if (!super.contains(o))
			return false;
		T temp = super.get(size - 1);
		super.remove(size - 1);
		size--;
		percolateDown(temp, super.indexOf(o));
		return true;
	}
	/**
	 * This method adds an element into the queue
	 */
	@Override
	public boolean add(T e) {
		if (e == null)
			throw new NullPointerException();
		super.add(e);
		size++;
		if (size > 1)
			this.percolateUp(e, size - 1);
		return true;
	}
	private ArrayList<T> percolateUp(T e, int index) {
		if (index == 0)
			return this;
		int parent = index / 2 + index % 2 - 1;
		if (e.compareTo(super.get(parent)) < 0) {
			set(index, get(parent));
			set(parent, e);
			this.percolateUp(e, index / 2);
		}
		return this;
	}
	private void percolateDown(T e, int index) {
		if (size == 1) {
			super.set(0, e);
		}
		if (index == size - 1) {
			return;
		}
		int leftIndex = 2 * index + 1;

		if (leftIndex > size - 1) {
			super.set(index, e);
			return;
		}
		T leftChild = super.get(leftIndex);

		if (leftIndex == size - 1) {
			if (e.compareTo(leftChild) > 0) {
				super.set(index, leftChild);
				super.set(leftIndex, e);
			}
			return;
		}

		int rightIndex = leftIndex + 1;
		
		T rightChild = super.get(rightIndex);
		if (leftChild.compareTo(rightChild) <= 0 && e.compareTo(leftChild) > 0) {
			super.set(index, leftChild);
			super.set(leftIndex, e);
		} else {
			super.set(index, rightChild);
			super.set(rightIndex, e);
		}
	}
	
	private T element() {
		if (isEmpty())
			throw new NoSuchElementException();
		return super.get(0);
	}

}
