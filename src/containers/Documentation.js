import React from 'react';

const Documentation = () => {
    return (
        <div className="documentation" style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '50px' }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '20px' }}>Linear Search Documentation</h1>
                    <p style={{ fontSize: '1.2em' }}>
                        Linear search, also known as sequential search, is a simple searching algorithm that checks every element in the list sequentially until the desired element is found or the end of the list is reached.
                    </p>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '30px' }}>How Linear Search Works:</h2>
                    <ol style={{ textAlign: 'left', fontSize: '1.2em' }}>
                        <li>Start from the first element in the list.</li>
                        <li>Compare the target element with each element of the list sequentially.</li>
                        <li>If the target element is found, return its index.</li>
                        <li>If the target element is not found after checking all elements, return a "not found" indication.</li>
                    </ol>
                    <div style={{ marginBottom: '50px' }}>
                        <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/linear_search.gif" alt="Linear search Animation" style={{ maxWidth: '100%', marginBottom: '20px' }} />
                        <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                            <h3>Algorithm</h3>
                            <p><b>Step 1 −</b> Set i to 1</p>
                            <p><b>Step 2 −</b> if i &gt; n then go to step 7</p>
                            <p><b>Step 3 −</b> if A[i] = x then go to step 6</p>
                            <p><b>Step 4 −</b> Set i to i + 1</p>
                            <p><b>Step 5 −</b> Go to Step 2</p>
                            <p><b>Step 6 −</b> Print Element x Found at index i and go to step 8</p>
                            <p><b>Step 7 −</b> Print element not found</p>
                            <p><b>Step 8 −</b> Exit</p>
                        </div>
                    </div>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '30px' }}>Linear Search Function in C++:</h2>
            <br></br>
            <pre style={{ fontSize: '1.2em', textAlign: 'left', padding: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <code style={{ fontWeight: 'bold' }}>
                    {`#include <iostream>

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;
        }
    }
    return -1; // Element not found
}

int main() {
    int arr[] = {4, 2, 7, 1, 9, 5};
    int key = 7;
    int n = sizeof(arr) / sizeof(arr[0]);
    int result = linearSearch(arr, n, key);
    if (result != -1) {
        std::cout << "Element found at index " << result << std::endl;
    } else {
        std::cout << "Element not found in the array" << std::endl;
    }
    return 0;
}`}
                </code>
            </pre>
            <br></br>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold'}}>Output:</p>
            <br></br>
            <pre style={{ fontSize: '1.2em', textAlign: 'left', padding: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <code style={{ fontWeight: 'bold' }}>
                    {`Element found at index 2`}
                </code>
            </pre>
                </div>
                <hr style={{ width: '100%', margin: '0', display: 'block', borderTop: '1px solid black' }} />
                <br></br>
                <div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '20px' }}>Binary Search Documentation</h1>
                    <p style={{ fontSize: '1.2em' }}>
                        Binary search is a fast search algorithm with a time complexity of O(log n). It works on a sorted array by repeatedly dividing the search interval in half.
                    </p>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '30px' }}>How Binary Search Works:</h2>
                    <br></br>
                    <ol style={{ textAlign: 'left', fontSize: '1.2em' }}>
                        <li>Compare the target value with the middle element of the array.</li>
                        <li>If the target value matches the middle element, return the middle index.</li>
                        <li>If the target value is less than the middle element, repeat the search on the left half of the array.</li>
                        <li>If the target value is greater than the middle element, repeat the search on the right half of the array.</li>
                        <li>If the search interval is empty (start index is greater than end index), the target is not in the array.</li>
                    </ol>
                    <div style={{ marginBottom: '50px' }}>
                    <br></br>
                    <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_1.jpg" alt="" /> 
                    <br></br>
                    <br></br>
    <h4>
        Now we compare the value stored at location 4, with the value being searched, i.e. 31. We find that the value at location 4 is 27, which is not a match. As the value is greater than 27 and we have a sorted array, so we also know that the target value must be in the upper portion of the array.
    </h4>
    <br></br>
    <br></br>
    <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_2.jpg" alt="" /><br></br> <br></br>
    <h4>
        We change our low to mid + 1 and find the new mid value again.
        <pre>
            low = mid + 1
            mid = low + (high - low) / 2
        </pre>
    </h4>
    <h4>
        Our new mid is 7 now. We compare the value stored at location 7 with our target value 31.
    </h4> <br></br> <br></br>
    <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_3.jpg" alt="" /> <br></br> <br></br>
    <h4>
        The value stored at location 7 is not a match, rather it is more than what we are looking for. So, the value must be in the lower part from this location.
    </h4> <br></br> <br></br>
    <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_4.jpg" alt="" /> <br></br> <br></br>
    <h4>
        Hence, we calculate the mid again. This time it is 5.
    </h4> <br></br> <br></br>
    <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_5.jpg" alt="" /> <br></br> <br></br>
    <h4>
        We compare the value stored at location 5 with our target value. We find that it is a match.
    </h4> <br></br> <br></br>
    <img src="https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_6.jpg" alt="" /> <br></br> <br></br>
    <h4>
        We conclude that the target value 31 is stored at location 5. <br />
        Binary search halves the searchable items and thus reduces the count of comparisons to be made to very less numbers.
    </h4> <br></br> <br></br>
                        <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                            <h3>Algorithm</h3>
                            <p><b>Step 1 −</b> Set start to 0 and end to n-1</p>
                            <p><b>Step 2 −</b> Repeat while start &lt;= end</p>
                            <p><b>Step 3 −</b> Set mid to (start+end)/2</p>
                            <p><b>Step 4 −</b> If arr[mid] == x, return mid</p>
                            <p><b>Step 5 −</b> If arr[mid] &lt; x, set start to mid+1</p>
                            <p><b>Step 6 −</b> Else set end to mid-1</p>
                            <p><b>Step 7 −</b> Go to Step 2</p>
                            <p><b>Step 8 −</b> Return -1 (element not found)</p>
                        </div>
                    </div>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '30px' }}>Binary Search Function in C++:</h2>
            <br></br>
            <pre style={{ fontSize: '1.2em', textAlign: 'left', padding: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <code style={{ fontWeight: 'bold' }}>
                    {`#include <iostream>

int binarySearch(int arr[], int start, int end, int key) {
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if (arr[mid] == key)
            return mid;
        if (arr[mid] < key)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return -1; // Element not found
}

int main() {
    int arr[] = {1, 2, 4, 5, 7, 9};
    int key = 7;
    int n = sizeof(arr) / sizeof(arr[0]);
    int result = binarySearch(arr, 0, n - 1, key);
    if (result != -1) {
        std::cout << "Element found at index " << result << std::endl;
    } else {
        std::cout << "Element not found in the array" << std::endl;
    }
    return 0;
}`}
                </code>
            </pre>
            <br></br>
            <p style={{ fontSize: '1.2em' }}>Output:</p>
            <br></br>
            <pre style={{ fontSize: '1.2em', textAlign: 'left', padding: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <code style={{ fontWeight: 'bold' }}>
                    {`Element found at index 4`}
                </code>
            </pre>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
