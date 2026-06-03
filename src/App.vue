<!-- xd -->
<template>
  <NavBar />
  <main>
    <HeroSection />
    <BioSection />
    <ClasesSection />
    <MilongaSection />
    <GaleriaSection />
    <ContactoSection />
  </main>
  <SiteFooter />
</template>

<script setup>
import NavBar         from '@/components/NavBar.vue'
import HeroSection    from '@/components/HeroSection.vue'
import BioSection     from '@/components/BioSection.vue'
import ClasesSection  from '@/components/ClasesSection.vue'
import MilongaSection from '@/components/MilongaSection.vue'
import GaleriaSection from '@/components/GaleriaSection.vue'
import ContactoSection from '@/components/ContactoSection.vue'
import SiteFooter     from '@/components/SiteFooter.vue'
</script>
