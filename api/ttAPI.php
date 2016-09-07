<?php
	error_reporting(-1);

	$output = array('status' => false, 'error' => ''); //output array contains all of the end results. if output status is true means clientside controller must expect a product. If it is false means there is no product and client side must expect error. We have two types of possible errors. one is the situation the url is not parsable. The second situation is xml successfully parsed but we couldn't retrieve any product.

	
	$feeds = @simplexml_load_file($_POST['feedsUrl']);
	
	if($feeds !== false){ //means we parse the data if simplexml_load_false doesn't return false.
		$products = [];
		foreach ($feeds->product as $product){ //extracting the data we need for client from loaded xml file.
			
			$thisProduct['productID'] = (string)$product->productID;
			$thisProduct['name'] = (string)$product->name;
			$curr = $product->price->attributes();
			$thisProduct['currency'] = (string)$curr->currency;		
			$thisProduct['price'] = (string)$product->price;
			$thisProduct['productURL'] = (string)$product->productURL;
			$thisProduct['imageURL'] = (string)$product->imageURL;
			$thisProduct['description'] = (string)$product->description;
			$thisProduct['categories'] = (string)$product->categories->category;

			$products[] = $thisProduct;
			$output['status'] = true;
		}
		
		if($output['status']){ //if we could retrieve any product then we change the output status to true.
			$output = array('status' => true, 'products' => $products, 'error' => '');
			
		} else{  //if we could retrieve any product then we should send an error
			$output['error'] = "Ooops, unfortunately, we couldn't retrieve any product from this XML file.";
		}
	
	} else{  //if we couldn't load the xml file for any reason then we should send an error
		$output['error'] = "Ooops, unfortunately we can't load this file. Please check the url of XML file again.";
	}


	echo json_encode($output);
?>