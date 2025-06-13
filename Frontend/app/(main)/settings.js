import { Pressable, Text, View, Dimensions, ScrollView } from "react-native";
import { Screen } from "../../components/Screen";
import { BackIcon } from "../../utils/Icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Logout } from "../../components/auth/Logout";
import { fetchUserProgress } from "../../context/api/user";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Settings() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);

  const [history, setHistory] = useState([]);
  const [weightData, setWeightData] = useState(null);

  useEffect(() => {
    const getUserProgress = async () => {
      const user = await AsyncStorage.getItem("username");
      const [data, res] = await fetchUserProgress();

      if (res) {
        console.error("Error, ", data.message);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
          text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
          text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
          position: "top",
          animation: true,
          visibilityTime: 2000,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: data.message,
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });

      setName(data.user.name);
      setUsername(user);
      setEmail(data.user.email);
      setWeight(data.progress.weight);
      setHeight(data.progress.height);
      setBodyFat(data.progress.body_fat);

      setHistory(data.history);
    };

    getUserProgress();
  }, []);

  useEffect(() => {
    if (history.length === 0) return;

    const sortedHistory = [...history].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    );

    const labels = [];
    const dataset = [];

    sortedHistory.forEach(({ created_at, weight }) => {
      const date = new Date(created_at);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().slice(-2);

      labels.push(`${day}/${month}/${year}`);
      const w = Number(weight) || 0;
      dataset.push(Math.min(Math.max(w, 50), 120));
    });

    setWeightData({
      labels,
      datasets: [
        {
          data: dataset,
          strokeWidth: 2,
          color: (opacity = 1) => `rgba(37, 174, 166, ${opacity})`,
          withDots: true,
        },
      ],
      legend: ["Peso corporal"],
    });
  }, [history]);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 15 }}
        className="px-5"
      >
        <Pressable onPress={() => router.push("/(main)/(tabs)/home")}>
          <BackIcon />
        </Pressable>

        <View className="mt-5 mb-6">
          <Text
            className="text-[#25AEA6] text-2xl mb-2"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Mi Perfil
          </Text>

          <Text
            className="text-white py-3 border-b border-gray-800"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Nombre Completo: {name ?? ""}
          </Text>

          <Text
            className="text-white py-3 border-b border-gray-800"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Nombre de usuario: {username ?? ""}
          </Text>

          <Text
            className="text-white py-3 border-b border-gray-800"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Peso corporal: {weight ?? 0} kg
          </Text>

          <Text
            className="text-white py-3 border-b border-gray-800"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Altura: {height ?? 0} cm
          </Text>

          <View className="py-3 border-b border-gray-800">
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-Bold",
              }}
            >
              Grasa corporal: {bodyFat ?? 0} %
            </Text>
          </View>
        </View>

        <View>
          {weightData ? (
            <LineChart
              data={weightData}
              width={screenWidth - 40}
              height={300}
              yAxisSuffix=" kg"
              fromZero={false}
              yLabelsOffset={10}
              yAxisInterval={10}
              formatXLabel={(label) => label}
              verticalLabelRotation={45}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientTo: "#08130D",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(37, 174, 166, ${opacity})`,
                labelColor: () => "#fff",
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#25AEA6",
                },
                propsForLabels: {
                  fontSize: 10,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: "center",
              }}
              yAxisLabel=""
              segments={10}
            />
          ) : (
            <Text
              className="text-white text-center"
              style={{
                fontFamily: "Inter-Bold",
              }}
            >
              - No hay datos todavía -
            </Text>
          )}
        </View>

        <View className="mt-6 mb-6">
          <Text
            className="text-[#25AEA6] text-2xl mb-2"
            style={{
              fontFamily: "Inter-Bold",
            }}
          >
            Cuenta
          </Text>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(main)/userData",
                params: {
                  username: username,
                  name: name,
                  email: email,
                  weight: weight,
                  height: height,
                  bodyFat: bodyFat,
                },
              })
            }
            className="py-3 border-b border-gray-800"
          >
            <Text
              className="text-white"
              style={{
                fontFamily: "Inter-Bold",
              }}
            >
              Actualizar datos
            </Text>
          </Pressable>

          <Logout
            onSuccess={() => {
              router.replace("/login");
            }}
          />

          <Pressable className="py-3 border-b border-gray-800">
            <Text
              className="text-red-600"
              style={{
                fontFamily: "Inter-Bold",
              }}
            >
              Eliminar cuenta
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
