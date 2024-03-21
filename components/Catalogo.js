import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Image, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import axios from 'axios';
import { styles } from './Styles';

export const Catalogo = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(2);

    const scrollViewRef = useRef(null); // Referencia al ScrollView

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://ecoserver-zopz.onrender.com/productos");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError("Error fetching product data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        scrollToTop(); // Llamar a la función scrollToTop cuando se pagine
    };

    const handleAbout = () => {
        showMessage({
            message: 'Si necesita saber mas visite nuestra pagina EcoNido',
            type: 'success',
            duration: 1000,
        });
    };

    const scrollToTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };

    return (
        <ImageBackground source={require("../assets/wallpaper.jpg")} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <ScrollView ref={scrollViewRef}> 
                    <Text variant="h2" style={{ textAlign: 'center', marginBottom: 20, marginTop: 50, color:"#fff", fontSize: 20, fontWeight: "bold" }}>Catálogo de Productos</Text>

                    {loading ? (
                        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Cargando...</Text>
                    ) : error ? (
                        <Text style={{ textAlign: 'center', marginBottom: 20, color: 'red' }}>Error: {error}</Text>
                    ) : (
                        <>
                            {currentProducts.map((product) => (
                                <Card key={product.id} style={{ marginBottom: 20}} containerStyle={styles.cardContainer}>
                                    <Image source={{ uri: product.image }} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
                                    <Card.Divider />
                                    <Card.Title>
                                        <Text variant="h3" style={[ styles.textStyled, { marginBottom: 5 }]}>{product.name}</Text>
                                    </Card.Title>
                                    <Card.Divider />
                                    <Text style={[ styles.textStyled, { marginBottom: 5 }]}>{product.description}</Text>
                                    <Text>Precio: {product.price}</Text>
                                    <Card.Divider />
                                    <Button color="#f7bb0e" onPress={handleAbout}>
                                        Saber mas
                                    </Button>
                                </Card>
                            ))}
                        </>
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                            <TouchableOpacity
                                onPress={() => paginate(i + 1)}
                                key={i}
                                style={{ padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginRight: 10 }}
                            >
                                <Text style={{color: "#fff"}}>{i + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
            </View>
            
        </ImageBackground>
    );
};
