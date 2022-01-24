import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';


const Products = ( { products, onAddToCart }) => {

    return (
        <main>
            <Grid 
                container
                spacing={4}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}

            </Grid>
        </main>
    );
}

export default Products;