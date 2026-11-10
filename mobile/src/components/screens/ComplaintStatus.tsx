import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';
import type { ComplaintStatus as ComplaintStatusType } from '../../types';

export const ComplaintStatus: React.FC = () => {
  const { t, language, complaints, updateComplaintStatus, setCurrentScreen } = useApp();
  const [filter, setFilter] = useState<'all' | ComplaintStatusType>('all');

  const filteredComplaints = complaints.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const getStatusBadge = (status: ComplaintStatusType) => {
    switch (status) {
      case 'resolved':
        return {
          label: t.complaintStatus.tabs.resolved,
          bg: '#ECFDF5',
          text: '#065F46',
          icon: 'checkmark-circle' as const
        };
      case 'in_progress':
        return {
          label: t.complaintStatus.tabs.inProgress,
          bg: '#FEF3C7',
          text: '#92400E',
          icon: 'time' as const
        };
      case 'open':
      default:
        return {
          label: t.complaintStatus.tabs.open,
          bg: '#EFF6FF',
          text: '#1E40AF',
          icon: 'alert-circle' as const
        };
    }
  };

  const handleToggleResolved = async (id: string, currentStatus: ComplaintStatusType) => {
    triggerHaptic('medium');
    const newStatus: ComplaintStatusType = currentStatus === 'resolved' ? 'in_progress' : 'resolved';
    await updateComplaintStatus(id, newStatus);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Filter Tabs */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {(['all', 'open', 'in_progress', 'resolved'] as const).map(tab => {
            const isSelected = filter === tab;
            let label = t.complaintStatus.tabs.all;
            if (tab === 'open') label = t.complaintStatus.tabs.open;
            if (tab === 'in_progress') label = t.complaintStatus.tabs.inProgress;
            if (tab === 'resolved') label = t.complaintStatus.tabs.resolved;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterChip, isSelected ? styles.filterChipActive : null]}
                onPress={() => {
                  triggerHaptic('selection');
                  setFilter(tab);
                }}
              >
                <Text style={[styles.filterChipText, isSelected ? styles.filterChipTextActive : null]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Ticket Card List */}
      <ScrollView contentContainerStyle={styles.scrollList}>
        {filteredComplaints.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="checkmark-done-circle" size={48} color="#0D9488" />
            </View>
            <Text style={styles.emptyTitle}>
              {language === 'ta' ? 'புகார்கள் எதுவும் இல்லை' : 'No Complaints Found'}
            </Text>
            <Text style={styles.emptyDesc}>
              {language === 'ta'
                ? 'அனைத்தும் சீராக உள்ளது. புதிய உதவி தேவைப்பட்டால் புதிய புகாரை பதிவு செய்யவும்.'
                : 'All clear! Tap below if you need any room, maintenance, or meal assistance.'}
            </Text>
            <TouchableOpacity
              style={styles.newTicketBtn}
              onPress={() => {
                triggerHaptic('light');
                setCurrentScreen(6);
              }}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.newTicketBtnText}>
                {language === 'ta' ? 'புதிய புகார் பதிவு' : 'Raise New Complaint'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredComplaints.map(item => {
            const badge = getStatusBadge(item.status);

            return (
              <View key={item.id} style={styles.ticketCard}>
                {/* Header row: ID & Status Badge */}
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketIdRow}>
                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={18} color="#64748B" />
                    <Text style={styles.ticketIdText}>{item.id}</Text>
                  </View>
                  <View style={[styles.badgeWrap, { backgroundColor: badge.bg }]}>
                    <Ionicons name={badge.icon} size={14} color={badge.text} />
                    <Text style={[styles.badgeText, { color: badge.text }]}>
                      {badge.label}
                    </Text>
                  </View>
                </View>

                {/* Title */}
                <Text style={styles.ticketTitle}>
                  {language === 'ta' ? item.titleTa : item.titleEn}
                </Text>

                {/* Description */}
                <Text style={styles.ticketDesc}>
                  {language === 'ta' ? item.descriptionTa : item.descriptionEn}
                </Text>

                {/* Footer date & Action Toggle */}
                <View style={styles.ticketFooter}>
                  <View style={styles.dateRow}>
                    <Ionicons name="time-outline" size={14} color="#94A3B8" />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.statusToggleBtn,
                      item.status === 'resolved' ? styles.statusToggleResolved : styles.statusToggleOpen
                    ]}
                    onPress={() => handleToggleResolved(item.id, item.status)}
                  >
                    <Ionicons
                      name={item.status === 'resolved' ? 'checkmark-circle' : 'radioButtonOff'}
                      size={16}
                      color={item.status === 'resolved' ? '#047857' : '#B45309'}
                    />
                    <Text
                      style={[
                        styles.statusToggleText,
                        { color: item.status === 'resolved' ? '#047857' : '#B45309' }
                      ]}
                    >
                      {item.status === 'resolved'
                        ? (language === 'ta' ? 'தீர்க்கப்பட்டது' : 'Resolved')
                        : (language === 'ta' ? 'தீர்க்க என குறி' : 'Mark Resolved')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Floating Add Complaint FAB */}
      {filteredComplaints.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            triggerHaptic('selection');
            setCurrentScreen(6);
          }}
          accessibilityRole="button"
          accessibilityLabel="Raise Complaint"
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 10
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterChipActive: {
    backgroundColor: '#0F766E'
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569'
  },
  filterChipTextActive: {
    color: '#FFFFFF'
  },
  scrollList: {
    padding: 16,
    paddingBottom: 40,
    gap: 14
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4
      },
      android: {
        elevation: 2
      }
    })
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ticketIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  ticketIdText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B'
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 4
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800'
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2
  },
  ticketDesc: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontWeight: '500'
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    marginTop: 6
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  dateText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500'
  },
  statusToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1
  },
  statusToggleResolved: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0'
  },
  statusToggleOpen: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A'
  },
  statusToggleText: {
    fontSize: 12,
    fontWeight: '700'
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 20
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A'
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18
  },
  newTicketBtn: {
    backgroundColor: '#0F766E',
    minHeight: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 6,
    marginTop: 20
  },
  newTicketBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800'
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0F766E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6
      },
      android: {
        elevation: 6
      }
    })
  }
});
