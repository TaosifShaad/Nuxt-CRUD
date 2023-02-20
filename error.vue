<script setup>
const error = useError();
const redirectHome = () => {
  navigateTo('/');
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-[700px]">
    <div class="circle-wrapper">
      <div class="warning circle"></div>
      <div class="icon">
        <i class="fa fa-exclamation">!</i>
      </div>
    </div>
    <h2 class="text-7xl text-gray-400 mt-3">{{ error.statusCode }}</h2>
    <h2 class="text-3xl text-gray-300 mt-1">{{ error.message }}</h2>
    <button class="btn mt-5" @click="redirectHome">Go to home</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gajraj+One&display=swap');
.circle-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  float: left;
  margin: 10px;
}

.icon {
  font-family: 'Gajraj One', cursive;
  position: absolute;
  color: #fff;
  top: -1px;
  left: 33px;
  animation: expand 2s ease infinite;
  font-size: 68px;
}

.circle {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 2.5px;
  background-clip: content-box;
  animation: spin 10s linear infinite;
}

.warning {
  background-color: red;
  border: 2.5px dashed red;
}

@keyframes spin {
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes expand {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

</style>