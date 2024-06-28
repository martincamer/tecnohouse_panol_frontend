import React from "react";
import {
  Document,
  Text,
  View,
  Page,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import bold from "../../fonts/Roboto-Bold.ttf";
import normal from "../../fonts/Roboto-Light.ttf";
import medium from "../../fonts/Roboto-Medium.ttf";
import logo from "../../../public/logo.png";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: normal,
      fontWeight: "normal",
    },
    {
      src: medium,
      fontWeight: "medium",
    },
    {
      src: bold,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    padding: 0, // Eliminamos el padding
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 5, // Añadimos padding para separar el contenido
  },
  image: {
    width: 30,
    height: 30,
  },
  textSmall: {
    fontSize: 10, // Tamaño de la letra más pequeño
    fontFamily: "Roboto",
    fontWeight: "medium",
    textTransform: "uppercase",
  },
});

export const DocumentoInventario = ({ productos }) => {
  return (
    <Document
      style={{
        zIndex: "100",
      }}
    >
      <Page
        size="A4"
        style={{
          padding: "30px 50px",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 100,
            }}
            src={logo}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Roboto",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          ></Text>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Roboto",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Tabla del inventario/catalogo de productos{" "}
            </Text>
          </View>

          {/* Tabla de productos */}
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={[styles.tableRow, { borderBottomWidth: 1 }]}>
                <View style={styles.tableCol}>
                  <Text style={styles.textSmall}>Imagen</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textSmall}>Codigo</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textSmall}>Detalle</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textSmall}>Tipo</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textSmall}>Categoría</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textSmall}>Cantidad</Text>
                </View>
              </View>
              {productos?.map((producto, index) => (
                <View style={styles.tableRow} key={index.toString()}>
                  <View style={styles.tableCol}>
                    <Image style={styles.image} src={producto.imagen} />
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textSmall}>{producto.codigo}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textSmall}>{producto.detalle}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textSmall}>{producto.tipo}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textSmall}>{producto.categoria}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textSmall}>{producto.stock}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
