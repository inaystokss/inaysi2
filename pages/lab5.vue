<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 px-6">
      <!-- Background Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <!-- Badge -->
            <div class="inline-flex items-center px-4 py-2 rounded-2xl bg-stone-500/10 border border-stone-500/20 backdrop-blur-sm">
              <div class="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></div>
              <span class="text-amber-500 text-sm font-mono uppercase tracking-widest">Live Monitoring Active</span>
            </div>

            <!-- Main Heading -->
            <div class="space-y-6">
              <h1 class="text-5xl  md:text-5xl lg:text-6xl font-bold leading-tight
              bg-clip-text text-transparent
              bg-gradient-to-r from-gray-700 to-black-700">
                Water
  
              Intelligence
              
                Platform
              </h1>
              
              <p class="text-xl text-amber-500 leading-relaxed max-w-2xl">
                Advanced real-time monitoring of North Kazakhstan's water ecosystems. 
                Track temperature, pollution levels, and pathogen risks with precision analytics.
              </p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md">
              <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                <div class="text-2xl font-bold text-gray-400 mb-1 group-hover:scale-110 transition-transform">{{ lakes.length }}</div>
                <div class="text-xs text-slate-400 uppercase tracking-wider">Water Bodies</div>
              </div>
              <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                <div class="text-2xl font-bold text-blue-300 mb-1 group-hover:scale-110 transition-transform">{{ lakes.filter(l => l.status === 'lake').length }}</div>
                <div class="text-xs text-slate-400 uppercase tracking-wider">Lakes</div>
              </div>
              <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                <div class="text-2xl font-bold text-green-400 mb-1 group-hover:scale-110 transition-transform">{{ lakes.filter(l => l.status === 'river').length }}</div>
                <div class="text-xs text-slate-400 uppercase tracking-wider">Rivers</div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/map" class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl text-gray-400 font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                <span>Explore Interactive Map</span>
              </NuxtLink>
              
              <NuxtLink to="/analytics" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-amber-300 font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                View Analytics
              </NuxtLink>
            </div>
          </div>
          <!-- Right Content - Data Visualization -->
          <div class="relative">
            <div class="relative bg-slate-200/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-stone-800 font-semibold text-lg">Live Water Bodies Map</h3>
                <div class="flex items-center space-x-2 text-amber-500">
                  <div class="w-2 h-2 bg-stone-300 rounded-full animate-pulse"></div>
                  <span class="text-sm font-mono">INTERACTIVE</span>
                </div>
              </div>

              <!-- Mini Map -->
              <div class="bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden mb-6">
                <div class="w-full h-80">
                  <LMap :zoom="miniMapZoom" :center="miniMapCenter" :use-global-leaflet="false" class="w-full h-full">
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                    
                    <LMarker v-for="(lake, i) in lakes" :key="i" :lat-lng="[lake.lat, lake.lng]" :draggable="false">
                      <LTooltip permanent direction="top" class="custom-mini-tooltip">
                        <div class="text-slate-900 font-semibold text-xs">{{ lake.name }}</div>
                      </LTooltip>
                    </LMarker>
                    
                    <LMarker :lat-lng="petropavl">
                      <LTooltip permanent direction="top" class="custom-mini-tooltip">
                        <div class="text-slate-900 font-semibold text-xs">Petropavlosk</div>
                      </LTooltip>
                    </LMarker>
                  </LMap>
                </div>
              </div>

              <!-- Map Legend -->
              <div class="flex items-center justify-between px-2 mb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1"><div class="w-3 h-3 bg-blue-400 rounded-full"></div><span class="text-slate-300 text-xs">Lakes</span></div>
                  <div class="flex items-center space-x-1"><div class="w-3 h-3 bg-cyan-400 rounded-full"></div><span class="text-slate-300 text-xs">Rivers</span></div>
                  <div class="flex items-center space-x-1"><div class="w-3 h-3 bg-orange-400 rounded-full"></div><span class="text-slate-300 text-xs">City</span></div>
                </div>
                <div class="text-slate-400 text-xs">Zoom: {{ miniMapZoom }}x</div>
              </div>

              <!-- Quick Stats -->
              <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                <div class="text-center"><div class="text-xl font-bold text-gray-400">{{ lakes.length }}</div><div class="text-xs text-slate-400 mt-1">Total</div></div>
                <div class="text-center"><div class="text-xl font-bold text-cyan-400">{{ lakes.filter(l => l.status === 'lake').length }}</div><div class="text-xs text-slate-400 mt-1">Lakes</div></div>
                <div class="text-center"><div class="text-xl font-bold text-green-400">{{ lakes.filter(l => l.status === 'river').length }}</div><div class="text-xs text-slate-400 mt-1">Rivers</div></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { lakes } from '~/components/data'

// Mini map config
const miniMapCenter = ref<[number, number]>([54.88, 69.16])
const miniMapZoom = ref(10)
const petropavl = ref<[number, number]>([54.88, 69.16])

// Load weather for each lake
onMounted(async () => {
  for (const lake of lakes) {
    await lake.setAxios()
  }
})
</script>
<style>
/* Фон всей страницы */
.relative.min-h-screen {
  background-color: #f5f5dc; /* beige */
}

/* Центрируем заголовок в блоке карты */
/* .relative .bg-slate-200/30 {
  display: flex;
  justify-content: center;
  align-items: center;
} */

/* Tooltip для карты */
.custom-mini-tooltip .leaflet-tooltip {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(203,213,225,0.5);
  border-radius: 8px;
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.2);
  font-size: 0.75rem;
  padding: 4px 8px;
}
</style>
