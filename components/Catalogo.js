import React, { useState, useEffect } from 'react';
import { ScrollView, Image, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import FlashMessage from 'react-native-flash-message';
import axios from 'axios';
import { styles } from './Styles';

export const Catalogo = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://ecoserver-zopz.onrender.com/productos");
                setProducts(response.data.map(product => ({ ...product, showDetails: false })));
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError("Error fetching product data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAbout = (product) => {
        setSelectedProduct(product);
        const updatedProducts = products.map(p => ({ ...p, showDetails: p.id === product.id }));
        setProducts(updatedProducts);
    };

    return (
        <ImageBackground source={require("../assets/wallpaper.jpg")} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <ScrollView>
                    <Text variant="h2" style={{ textAlign: 'center', marginBottom: 20, marginTop: 50, color: "#fff", fontSize: 20, fontWeight: "bold" }}>Catálogo de Productos</Text>

                    {loading ? (
                        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Cargando...</Text>
                    ) : error ? (
                        <Text style={{ textAlign: 'center', marginBottom: 20, color: 'red' }}>Error: {error}</Text>
                    ) : selectedProduct ? (
                        <>
                            <Card containerStyle={styles.cardContainer}>
                                <Image source={{ uri: selectedProduct.image }} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
                                <Card.Divider />
                                <Card.Title>
                                    <Text variant="h3" style={[styles.textStyled, { marginBottom: 5 }]}>Detalle de {selectedProduct.name}</Text>
                                </Card.Title>
                                <Card.Divider />
                                <Text style={[styles.textStyled, { marginBottom: 5 }]}>{selectedProduct.description}</Text>
                                <Text style={styles.textStyled}>Precio: {selectedProduct.price}</Text>
                                <Card.Divider />
                                <Button color="#f7bb0e" onPress={() => setSelectedProduct(null)}>Volver al catálogo</Button>
                            </Card>
                        </>
                    ) : (
                        <>
                            {products.map(product => (
                                <Card key={product.id} style={{ marginBottom: 20 }} containerStyle={styles.cardContainer}>
                                    <Image source={{ uri: product.image }} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
                                    <Card.Divider />
                                    <Card.Title>
                                        <Text variant="h3" style={[styles.textStyled, { marginBottom: 5 }]}>{product.name}</Text>
                                    </Card.Title>
                                    <Card.Divider />
                                    <Text style={[styles.textStyled, { marginBottom: 5 }]}>{product.description}</Text>
                                    <Text>Precio: {product.price}</Text>
                                    <Card.Divider />
                                    <Button color="#f7bb0e" onPress={() => handleAbout(product)}>Saber más</Button>
                                </Card>
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>
            <FlashMessage position="bottom" />
        </ImageBackground>
    );
};
