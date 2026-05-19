describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  // We use .skip() here because this test has a TODO that has not been completed yet.
  // Make sure to remove the .skip after you finish the TODO. 
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    console.log(`Checking product item 1/${prodItemsData.length}`);

    // for loop to check every <produce-item> it found
    for(let i = 0; i < prodItemsData[i]; i++){

    // Make sure the title, price, and image are populated in the JSON
      firstValue = prodItemsData[0];
      if (firstValue.title.length == 0) { allArePopulated = false; }
      if (firstValue.price.length == 0) { allArePopulated = false; }
      if (firstValue.image.length == 0) { allArePopulated = false; }
    }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

     const prodItem = await page.$('product-item');
     const button = await prodItem.evaluateHandle(element => element.shadowRoot.querySelector('button'));

     const beforeClick = await button.getProperty('innerText');
     const beforeClickText = await beforeClick.jsonValue();
     console.log(`Button text before clicking: ${beforeClickText}`);

     await button.click();
     await new Promise(resolve => setTimeout(resolve, 500));
     const afterClick = await button.getProperty('innerText');
     const afterClickText = await afterClick.jsonValue();
     console.log(`Button text after clicking: ${afterClickText}`);

     expect(afterClickText).toBe('Remove from Cart');
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    const prodItems = await page.$$('product-item');
    for(let i = 0; i < prodItems.length; i++){
      const button = await prodItems[i].evaluateHandle(element => element.shadowRoot.querySelector('button'));
      const buttonText = await button.getProperty('innerText');
      const textValue = await buttonText.jsonValue();
      if(textValue === 'Add to Cart'){
        await button.click();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    const cartCount = await page.$eval('#cart-count', element => element.innerText);
    expect(parseInt(cartCount)).toBe(20);
  }, 30000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();
    await page.waitForSelector('product-item');
    const prodItems = await page.$$('product-item');
    
    for(let i = 0; i < prodItems.length; i++){
      const buttonText = await prodItems[i].evaluateHandle(element => element.shadowRoot.querySelector('button').innerText);
      const text = await buttonText.jsonValue();
      expect(text).toBe('Remove from Cart');
    }

    const cartCount = await page.$eval('#cart-count', element => element.innerText);
    expect(parseInt(cartCount)).toBe(20);

  }, 30000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {

    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    const prodItems = await page.$$('product-item');

    for(let i = 0; i< prodItems.length; i++){
      const button = await prodItems[i].evaluateHandle(element => element.shadowRoot.querySelector('button'));
      const buttonText = await button.getProperty('innerText');
      const theText = await buttonText.jsonValue();
      if(theText === 'Remove from Cart'){
        await button.click();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    const cartCount = await page.$eval('#cart-count', element => element.innerText);
    expect(parseInt(cartCount)).toBe(0);
  }, 30000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();
    await page.waitForSelector('product-item');
    const prodItems = await page.$$('product-item');

    for(let i = 0; i < prodItems.length; i++){
      const button = await prodItems[i].evaluateHandle(element => element.shadowRoot.querySelector('button'));
      const buttonText = await button.getProperty('innerText');
      const theText = await buttonText.jsonValue();
      expect(theText).toBe('Add to Cart');
    }
    
    const cartCount = await page.$eval('#cart-count', element => element.innerText);
    expect(parseInt(cartCount)).toBe(0);
  }, 30000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    /**
     **** TODO - STEP 8 **** 
     * At this point he item 'cart' in localStorage should be '[]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(cart).toBe('[]');

  });
});
