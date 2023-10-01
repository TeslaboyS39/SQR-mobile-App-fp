import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOrderList } from "../stores/action";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { rupiah } from "../hooks/rupiahConvert";
import { colors } from "../assets/assests";
import YoutubePlayer from "react-native-youtube-iframe";

const OrderDetail = ({ route }) => {
  const { orderId } = route.params;
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => {
    return state.orderDetail;
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    dispatch(fetchOneOrderList(orderId));
  }, [dispatch, orderId]);

  if (!orderDetail) {
    return (
      <View>
        <Text>Mengambil data...</Text>
      </View>
    );
  }

  const openMediaModal = (url) => {
    setMediaUrl(url);
    setModalVisible(true);
  };

  const closeMediaModal = () => {
    setMediaUrl("");
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Detail Pesanan #{orderDetail?.order?.OrderId}
            </Text>
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderInfoText}>
              Status Pembayaran:{" "}
              {orderDetail?.order?.statusPayment ? "Lunas" : "Belum Lunas"}
            </Text>
            <Text style={styles.orderInfoText}>
              Total Harga: {rupiah(orderDetail?.order?.totalPrice)}
            </Text>
            <Text style={styles.orderInfoText}>
              Total Kuantitas: {orderDetail?.order?.totalQuantity}
            </Text>
          </View>

          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderDetailsTitle}>Detail Pesanan:</Text>
            {orderDetail?.orderDetails?.length > 0 ? (
              orderDetail.orderDetails.map((detail, index) => (
                <View key={index} style={styles.orderDetailContainer}>
                  <View style={styles.orderDetailLeft}>
                    {detail.Qurban.imageUrl1 && (
                      <Image
                        source={{ uri: detail.Qurban.imageUrl1 }}
                        style={styles.orderDetailImage}
                      />
                    )}
                  </View>
                  <View style={styles.orderDetailRight}>
                    <Text style={styles.orderDetailText}>
                      {detail.Qurban.name}
                    </Text>
                    <Text style={styles.orderDetailText}>
                      Atas Nama: {detail.onBehalfOf}
                    </Text>
                    <Text style={styles.orderDetailText}>
                      Bobot: {detail.Qurban.weight}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>Tidak ada detail pesanan yang tersedia.</Text>
            )}
          </View>

          <View style={styles.orderHistoriesContainer}>
            <Text style={styles.orderDetailsTitle}>Catatan Pesanan:</Text>
            {orderDetail?.orderHistories?.map((history, index) => (
              <View
                key={index}
                style={[
                  styles.orderHistory,
                  index !== orderDetail.orderHistories.length - 1 &&
                    styles.orderHistorySeparator,
                ]}
              >
                <Text style={styles.orderHistoryTitle}>{history.title}</Text>
                <Text style={styles.orderHistoryDescription}>
                  {history.description}
                </Text>
                {history.imageUrl && (
                  <TouchableOpacity
                    onPress={() => openMediaModal(history.imageUrl)}
                  >
                    <Image
                      source={{ uri: history.imageUrl }}
                      style={styles.orderHistoryImage}
                    />
                  </TouchableOpacity>
                )}
                {history.videoUrl && (
                  <TouchableOpacity
                    onPress={() => openMediaModal(history.videoUrl)}
                    style={styles.playVideoButton}
                  >
                    <Text style={styles.playVideoButtonText}>Play Video</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeMediaModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeMediaModal}
            >
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 16,
                justifyContent: "center",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <YoutubePlayer height={300} play={playing} videoId={mediaUrl} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  playVideoButton: {
    backgroundColor: colors.COLOR_PRIMARY,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  playVideoButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: colors.COLOR_PRIMARY,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  orderHistory: {
    marginBottom: 16,
  },
  orderHistorySeparator: {
    marginBottom: 8,
  },
  orderInfo: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  orderInfoText: {
    fontSize: 16,
  },
  orderDetailContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderDetailLeft: {
    flex: 1,
    marginRight: 16,
  },
  orderDetailRight: {
    flex: 2,
  },
  orderDetailImage: {
    width: "100%",
    height: 100,
  },
  orderHistoryImage: {
    width: "100%",
    height: 200,
    marginTop: 16,
    marginBottom: 10,
    borderRadius: 10
  },
  orderDetailsTitle: {
    fontSize: 18,
    marginTop: 23,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderDetail: {
    marginBottom: 16,
  },
  orderDetailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderHistoriesContainer: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  orderHistory: {
    backgroundColor: "white",
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  orderHistoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderHistoryDescription: {
    fontSize: 14,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default OrderDetail;
