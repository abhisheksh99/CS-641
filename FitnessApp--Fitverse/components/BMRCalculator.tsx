import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const BMRCalculator = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [bmr, setBmr] = useState(null);

  const activityLevels = [
    { level: "Sedentary: little or no exercise", factor: 1.2 },
    { level: "Exercise 1-3 times/week", factor: 1.375 },
    { level: "Exercise 4-5 times/week", factor: 1.465 },
    { level: "Daily exercise or intense exercise 3-4 times/week", factor: 1.55 },
    { level: "Intense exercise 6-7 times/week", factor: 1.725 },
    { level: "Very intense exercise daily, or physical job", factor: 1.9 },
  ];

  const calculateBMR = () => {
    if (!age || !weight || !height) {
      Alert.alert("Error", "Please enter all the required fields");
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age, 10);

    let bmrValue;
    if (gender === "male") {
      bmrValue = 88.362 + 13.397 * weightNum + 4.799 * heightNum - 5.677 * ageNum;
    } else {
      bmrValue = 447.593 + 9.247 * weightNum + 3.098 * heightNum - 4.33 * ageNum;
    }

    setBmr(bmrValue);

    // Reset fields after 15 seconds
    setTimeout(resetFields, 15000);
  };

  const resetFields = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("male");
    setBmr(null);
  };

  const getMacroBreakdown = (calories) => {
    const protein = Math.round((0.25 * calories) / 4);
    const carbs = Math.round((0.5 * calories) / 4);
    const fats = Math.round((0.25 * calories) / 9);
    return { protein, carbs, fats };
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-3xl font-bold text-center text-rose-600 mb-8 mt-5">
          BMR Calculator
        </Text>

        <View className="space-y-6 mb-8">
          <View>
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Age
            </Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Enter your age"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-gray-50"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Weight (kg)
            </Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="Enter your weight in kg"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-gray-50"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Height (cm)
            </Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="Enter your height in cm"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-gray-50"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Gender
            </Text>
            <View className="border border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                className="w-full px-4 py-2 text-gray-700"
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={calculateBMR}
          className="w-full bg-rose-600 py-4 rounded-full items-center shadow-md mb-8"
        >
          <Text className="text-white font-bold text-lg">Calculate BMR</Text>
        </TouchableOpacity>

        {bmr !== null && (
          <View className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <Text className="text-2xl font-bold text-center text-rose-600 mb-6">
              Your BMR is: {Math.round(bmr)} kcal/day
            </Text>

            <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
              Daily Calorie Needs Based on Activity Level:
            </Text>

            <View className="space-y-4 mb-6">
              {activityLevels.map((activity) => {
                const dailyCalories = Math.round(bmr * activity.factor);
                const { protein, carbs, fats } = getMacroBreakdown(dailyCalories);

                return (
                  <View key={activity.level} className="border-b border-gray-200 pb-4 mb-4">
                    <Text className="text-black mb-2">{activity.level}</Text>
                    <Text className="text-sm font-semibold text-rose-600 mb-2">
                      {dailyCalories} kcal/day
                    </Text>
                    <Text className="text-sm text-black">Protein: {protein}g</Text>
                    <Text className="text-sm text-black">Carbs: {carbs}g</Text>
                    <Text className="text-sm text-black">Fats: {fats}g</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BMRCalculator;
