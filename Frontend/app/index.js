// app/index.js
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  return <Redirect href="/splash" />;
}
