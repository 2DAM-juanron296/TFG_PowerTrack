import { View, Text, Pressable } from "react-native";
import { Screen } from "../../../components/Screen";
import { DownloadIcon, SettingsIcon, UserIcon } from "../../../utils/Icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchDataUser, getInform } from "../../../context/api/user";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("Username");

  const [durationWeek, setDurationWeek] = useState(0);
  const [durationMonth, setDurationMonth] = useState(0);
  const [durationYear, setDurationYear] = useState(0);

  const [workoutsWeek, setWorkoutsWeek] = useState(0);
  const [workoutsMonth, setWorkoutsMonth] = useState(0);
  const [workoutsYear, setWorkoutsYear] = useState(0);

  const [totalWorkouts, setTotalWorkouts] = useState(0);

  const [top, setTop] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem("username");
      if (user !== null) {
        setUsername(user);
      }

      const [data, res] = await fetchDataUser();

      if (res) {
        console.log("ERROR: ", data.message);
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

      setDurationWeek(data.durationWeek || 0);
      setDurationMonth(data.durationMonth || 0);
      setDurationYear(data.durationYear || 0);

      setWorkoutsWeek(data.workoutsWeek || 0);
      setWorkoutsMonth(data.workoutsMonth || 0);
      setWorkoutsYear(data.workoutsYear || 0);

      setTotalWorkouts(data.totalWorkouts || 0);

      setTop(data.top || []);
    };

    getData();
  }, []);

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");

    const min = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const sec = (secs % 60).toString().padStart(2, "0");

    return hrs !== "00" ? `${hrs}:${min}:${sec}` : `${min}:${sec}`;
  };

  const handleDownloadInform = async () => {
    try {
      const [data, res] = await getInform();

      if (res) {
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

      console.log("Datos: ", data);

      generatePDF(data);
    } catch (error) {
      console.error("Error al descargar el informe", error);
      Toast.show({
        type: "error",
        text1: "Error al descargar el informe",
        text1Style: { fontFamily: "Inter-Bold", fontSize: 12 },
        text2Style: { fontFamily: "Inter-SemiBold", fontSize: 11 },
        position: "top",
        animation: true,
        visibilityTime: 2000,
      });
    }
  };

  const generatePDF = async (data) => {
    const { user, exercises: favExercises, muscle_groups: favMuscles } = data;

    const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          h1, h2 { color: #25AEA6; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #25AEA6; color: white; }
          .section { margin-bottom: 25px; }
        </style>
      </head>
      <body>
        <h1>Informe de ${user.username}</h1>

        <div class="section">
          <h2>Datos Generales</h2>
          <p><strong>Tiempo de entreno (semana):</strong> ${formatTime(durationWeek)}</p>
          <p><strong>Tiempo de entreno (mes):</strong> ${formatTime(durationMonth)}</p>
          <p><strong>Tiempo de entreno (año):</strong> ${formatTime(durationYear)}</p>
          <p><strong>Total entrenamientos:</strong> ${totalWorkouts}</p>
        </div>

        <div class="section">
          <h2>Usuario</h2>
          <p><strong>Nombre Completo:</strong> ${user.name}</p>
          <p><strong>Nombre de Usuario:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Registrado desde:</strong> ${new Date(
            user.created_at,
          ).toLocaleDateString()}</p>
        </div>

        <div class="section">
          <h2>Ejercicios favoritos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${favExercises
                .map(
                  (ex) => `
                <tr>
                  <td>${ex.name}</td>
                  <td>${ex.total}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Grupos Musculares favoritos</h2>
          <table>
            <thead>
              <tr>
                <th>Grupo Muscular</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${favMuscles
                .map(
                  (mg) => `
                <tr>
                  <td>${mg.muscle_group}</td>
                  <td>${mg.total}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    await Sharing.shareAsync(uri);
  };

  return (
    <Screen>
      <View className="mx-10">
        <View className="flex-row justify-start items-center border bg-[#0f0f0f] rounded-lg p-3 space-x-5 mt-2">
          <UserIcon />
          <View>
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {username}
            </Text>
            <Text
              className="text-md text-[#999]"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              Entrenos
            </Text>
            <Text
              className="text-md text-white"
              style={{ fontFamily: "Inter-SemiBold" }}
            >
              {totalWorkouts}
            </Text>
          </View>

          <View className="absolute right-5">
            <Pressable
              onPress={() => {
                router.push("/(main)/settings");
              }}
            >
              <SettingsIcon />
            </Pressable>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-2 mt-6">
          <Text
            className="text-2xl text-[#25AEA6]"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Estadísticas
          </Text>

          <Pressable
            className="bg-[#25AEA6] px-2 py-1 items-center rounded"
            onPress={handleDownloadInform}
          >
            <DownloadIcon />
          </Pressable>
        </View>

        <View className="mt-2">
          <Text
            className="text-xl text-[#25AEA6] mb-3"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Duración
          </Text>
          <View className="justify-center items-start border bg-[#0f0f0f] rounded-lg p-3 space-y-2">
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Esta semana
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {formatTime(durationWeek)}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este mes
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {formatTime(durationMonth)}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este año
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {formatTime(durationYear)}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <Text
            className="text-xl text-[#25AEA6] mb-3"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Entrenos
          </Text>
          <View className="justify-center items-start border bg-[#0f0f0f] rounded-lg p-3 space-y-2">
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Esta semana
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {workoutsWeek}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este mes
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {workoutsMonth}
              </Text>
            </View>
            <View className="w-full flex-row justify-between">
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                Este año
              </Text>
              <Text
                className="text-md text-white"
                style={{ fontFamily: "Inter-Bold" }}
              >
                {workoutsYear}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <Text
            className="text-xl text-[#25AEA6] mb-3"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Top - PR
          </Text>
          <View className="justify-center items-start border bg-[#0f0f0f] rounded-lg p-3 space-y-2">
            {top.length === 0 && (
              <Text className="text-white" style={{ fontFamily: "Inter-Bold" }}>
                No hay datos
              </Text>
            )}
            {top.map((item, index) => (
              <View key={index} className="w-full flex-row justify-between">
                <Text
                  className="text-md text-white"
                  style={{ fontFamily: "Inter-Bold" }}
                >
                  {index + 1}. {item.exercise_name}
                </Text>
                <Text
                  className="text-md text-white"
                  style={{ fontFamily: "Inter-Bold" }}
                >
                  {item.weight} kg x {item.reps} reps
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}
