<template>
  <WelcomePopup />
  <main>
    <HeroSection />
    <BioSection />
    <ClasesSection />
    <MilongaSection />
    <GaleriaSection />
    <ContactoSection />
    <GoogleCalendar />
  </main>
</template>

<script setup>
import HeroSection     from '@/components/HeroSection.vue'
import BioSection      from '@/components/BioSection.vue'
import ClasesSection   from '@/components/ClasesSection.vue'
import MilongaSection  from '@/components/MilongaSection.vue'
import GaleriaSection  from '@/components/GaleriaSection.vue'
import ContactoSection from '@/components/ContactoSection.vue'
import GoogleCalendar  from '@/components/GoogleCalendar.vue'
import WelcomePopup    from '@/components/WelcomePopup.vue'
</script>