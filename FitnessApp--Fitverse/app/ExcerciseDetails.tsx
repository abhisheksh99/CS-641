import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Timer from "../components/Timer";
import { db } from "../firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/authContext";

interface ExerciseDetailsRouteProps {
  route: RouteProp<
    {
      params: {
        item: {
          id: string;
          name: string;
          gifUrl: string;
          equipment: string;
          target: string;
          secondaryMuscles: string[];
        };
      };
    },
    "params"
  >;
}

interface InfoSectionProps {
  title: string;
  data: string | string[];
  delay: number;
}

const ExerciseDetails = ({ route }: ExerciseDetailsRouteProps) => {
  const { item } = route.params;
  const { user } = useAuth() || {};
  const [modalVisible, setModalVisible] = useState(true);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const saveTrackingData = async () => {
    if (!sets || !reps || !weight) {
      Alert.alert("Incomplete Data", "Please fill in all tracking fields.");
      return;
    }
    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }
    try {
      const logData = {
        exerciseId: item.id,
        name: item.name,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
        timestamp: Timestamp.now(),
        userEmail: user.email || "unknown",
        userId: user.uid,
      };
      console.log("Saving exercise log with user data:", logData);
      await addDoc(collection(db, "exerciseLogs"), logData);
      Alert.alert("Success", "Your exercise data has been saved.");
    } catch (error) {
      console.error("Error saving tracking data:", error);
      Alert.alert("Error", "Could not save data. Please try again.");
    }
  };

  const InfoSection = ({ title, data, delay }: InfoSectionProps) => (
    <View className="mb-4">
      <Text className="text-lg font-semibold text-gray-700 mb-2">{title}:</Text>
      <View className="flex-row flex-wrap">
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <View
              key={index}
              className="bg-fuchsia-100 rounded-full px-3 py-1 mr-2 mb-2"
            >
              <Text className="text-fuchsia-700">{item}</Text>
            </View>
          ))
        ) : (
          <View className="bg-fuchsia-100 rounded-full px-3 py-1 mr-2 mb-2">
            <Text className="text-fuchsia-700">{data}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            className="bg-white rounded-3xl shadow-lg"
            style={{ width: wp(90), maxHeight: hp(80) }}
          >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View className="relative">
                <View>
                  <Image
                    source={{ uri: item.gifUrl }}
                    contentFit="cover"
                    style={{ width: wp(90), height: hp(40) }}
                    className="rounded-t-3xl"
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={closeModal}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      padding: 8,
                    }}
                  >
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="p-6">
                <Text
                  className="text-3xl font-extrabold mb-3 text-gray-800 tracking-wide text-center uppercase"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 1)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {item.name}
                </Text>
                <View className="h-1 w-20 bg-fuchsia-600 mb-4" />
                <InfoSection
                  title="Equipment"
                  data={item.equipment}
                  delay={800}
                />
                <InfoSection
                  title="Target Muscle"
                  data={item.target}
                  delay={1000}
                />
                <InfoSection
                  title="Secondary Muscles"
                  data={item.secondaryMuscles}
                  delay={1200}
                />
                <View className="mb-6">
                  <Text className="text-lg font-semibold mb-2 text-gray-700">
                    Track Your Progress:
                  </Text>
                  <TextInput
                    placeholder="Sets"
                    keyboardType="numeric"
                    value={sets}
                    onChangeText={setSets}
                    className="mb-3 px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <TextInput
                    placeholder="Reps"
                    keyboardType="numeric"
                    value={reps}
                    onChangeText={setReps}
                    className="mb-3 px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <TextInput
                    placeholder="Weight (kg)"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                    className="mb-3 px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <TouchableOpacity
                    onPress={saveTrackingData}
                    className="py-2 bg-indigo-500 rounded-full"
                  >
                    <Text className="text-center text-white font-bold">
                      Save Tracking Data
                    </Text>
                  </TouchableOpacity>
                </View>
                <Timer onTimerComplete={saveTrackingData} />
                <View>
                  <TouchableOpacity
                    onPress={closeModal}
                    className="bg-fuchsia-600 rounded-full py-3 px-6 mt-6"
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseDetails;
