import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderTitle from '../components/HeaderTitle';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        // Round9: ボトムタブバーは非表示にし、共有コンポーネントTopTabBarを
        // 各画面の先頭に配置してトップタブ化する。
        tabBarActiveTintColor: '#FF2D87', // COLOR_ACCENT_PINK（象モチーフのピンク）に統一
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: { display: 'none' },
        headerStyle: { backgroundColor: '#0B1437' },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: '800' },
        // Round10: 全画面共通ヘッダーに🐘バッジ＋タイトルを表示する
        headerTitle: ({ children }) => <HeaderTitle>{children}</HeaderTitle>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'キャリア別資格パス',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: '演習',
          href: null,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: '進捗',
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: '保存',
          tabBarIcon: ({ color, size }) => <Ionicons name="bookmark" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="glossary"
        options={{
          title: '用語集',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />

      {/* Non-tab navigable screens */}
      <Tabs.Screen
        name="subject/[key]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mock-exam"
        options={{
          title: '模擬試験',
          href: null,
        }}
      />
      <Tabs.Screen
        name="jobs/[roleId]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="qualifications/[examId]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="progress/[examId]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="vc-notes"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
