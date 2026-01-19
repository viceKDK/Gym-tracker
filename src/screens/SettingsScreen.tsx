/**
 * Settings Screen
 * Allows users to configure app preferences including language
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../i18n/translations';

export default function SettingsScreen() {
  const theme = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = async (lang: Language) => {
    if (lang === language) return;

    try {
      await setLanguage(lang);
    } catch (error) {
      Alert.alert(
        t.common.error,
        'Failed to change language'
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Language Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t.settings.language}
        </Text>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleLanguageChange('es')}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                Español
              </Text>
              {language === 'es' && (
                <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleLanguageChange('en')}
          >
            <View style={styles.optionContent}>
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                English
              </Text>
              {language === 'en' && (
                <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t.settings.about}
        </Text>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.option}>
            <Text style={[styles.optionText, { color: theme.colors.text }]}>
              {t.settings.version}
            </Text>
            <Text style={[styles.optionSubtext, { color: theme.colors.textSecondary }]}>
              1.0.0
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  option: {
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionSubtext: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
