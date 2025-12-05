<template>
  <div class="gallery">
    <figure v-for="n in 10" :key="n">
      <img :src="`/catt${n}.jpg`" :alt="`cat${n}`" />
      <figcaption>Кот №{{ n }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 20px;
}

figure {
  text-align: center;
  transition: transform 0.3s;
  background-color: #fdf6ec; /* бежевый фон */
  border: 4px solid #d9c6a5; /* рамка */
  border-radius: 12px;
  padding: 10px;
}

figure:hover {
  transform: scale(1.05);
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

figcaption {
  font-size: 14px;
  margin-top: 5px;
  color: #444;
}
</style>