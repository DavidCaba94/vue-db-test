<template>
  <div class="contenedor-perfil">
    <!-- Cambio de imagen -->
    <div class="box-form">
        <div class="img-perfil"></div>
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Foto" name="foto" id='foto' required />
            <label for="foto" class="form__label">Foto</label>
        </div>
        <p class="mensaje-error"></p>
        <div class="btn-guardar" @click="actualizarFoto()">Guardar</div>
        <div id="loading-reg" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Datos principales -->
    <p class="indicador-form">Datos principales</p>
    <div class="box-form">
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Nombre" name="nombre" id='nombre' v-model="usuario.nombre" required />
        <label for="nombre" class="form__label">Nombre</label>
      </div>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Apellidos" name="apellidos" id='apellidos' v-model="usuario.apellidos" required />
        <label for="apellidos" class="form__label">Apellidos</label>
      </div>
      <div class="form__group field">
        <input type="email" class="form__field" placeholder="Email" name="email" id='email' v-model="usuario.email" required />
        <label for="email" class="form__label">Email</label>
      </div>
      <div class="form__group field select">
        <select id="provincia" class="select-text" v-model="usuario.provincia" required>
          <option value="" disabled selected></option>
          <option value="Álava">Álava</option>
          <option value="Albacete">Albacete</option>
          <option value="Alicante">Alicante</option>
          <option value="Almería">Almería</option>
          <option value="Asturias">Asturias</option>
          <option value="Ávila">Ávila</option>
          <option value="Badajoz">Badajoz</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Burgos">Burgos</option>
          <option value="Cáceres">Cáceres</option>
          <option value="Cádiz">Cádiz</option>
          <option value="Cantabria">Cantabria</option>
          <option value="Castellón">Castellón</option>
          <option value="Ciudad Real">Ciudad Real</option>
          <option value="Córdoba">Córdoba</option>
          <option value="La Coruña">La Coruña</option>
          <option value="Cuenca">Cuenca</option>
          <option value="Gerona">Gerona</option>
          <option value="Granada">Granada</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="Guipúzcoa">Guipúzcoa</option>
          <option value="Huelva">Huelva</option>
          <option value="Huesca">Huesca</option>
          <option value="Islas Baleares">Islas Baleares</option>
          <option value="Jaén">Jaén</option>
          <option value="León">León</option>
          <option value="Lérida">Lérida</option>
          <option value="Lugo">Lugo</option>
          <option value="Madrid">Madrid</option>
          <option value="Málaga">Málaga</option>
          <option value="Murcia">Murcia</option>
          <option value="Navarra">Navarra</option>
          <option value="Orense">Orense</option>
          <option value="Palencia">Palencia</option>
          <option value="Las Palmas">Las Palmas</option>
          <option value="Pontevedra">Pontevedra</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Salamanca">Salamanca</option>
          <option value="Segovia">Segovia</option>
          <option value="Sevilla">Sevilla</option>
          <option value="Soria">Soria</option>
          <option value="Tarragona">Tarragona</option>
          <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
          <option value="Teruel">Teruel</option>
          <option value="Toledo">Toledo</option>
          <option value="Valencia">Valencia</option>
          <option value="Valladolid">Valladolid</option>
          <option value="Vizcaya">Vizcaya</option>
          <option value="Zamora">Zamora</option>
          <option value="Zaragoza">Zaragoza</option>
          <option value="Ceuta">Ceuta</option>
          <option value="Melilla">Melilla</option>
        </select>
        <span class="select-highlight"></span>
        <span class="select-bar"></span>
        <label class="select-label">Provincia</label>
      </div>
      <p class="mensaje-error"></p>
      <div class="btn-guardar" @click="actualizarPerfil()">Guardar</div>
      <div id="loading-reg" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Cambio de contraseña -->
    <p class="indicador-form">Cambiar contraseña</p>
    <div class="box-form">
        <div class="form__group field">
            <input type="password" class="form__field" placeholder="Contraseña actual" name="old-password" id='old-password' required />
            <label for="password" class="form__label">Contraseña actual</label>
        </div>
        <div class="form__group field">
            <input type="password" class="form__field" placeholder="Nueva contraseña" name="password" id='password' required />
            <label for="password" class="form__label">Nueva contraseña</label>
        </div>
        <div class="form__group field">
            <input type="password" class="form__field" placeholder="Confirmar nueva contraseña" name="password-confirm" id='password-confirm' required />
            <label for="password-confirm" class="form__label">Confirmar nueva contraseña</label>
        </div>
        <p class="mensaje-error"></p>
        <div class="btn-guardar" @click="actualizarPassword()">Guardar</div>
        <div id="loading-reg" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Eliminar cuenta -->
    <div class="btn-eliminar-cuenta" @click="eliminarCuenta()"><img class="delete-img" src="../assets/img/delete.png">Eliminar cuenta</div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            usuario: ''
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
    }
}
</script>

<style>
@import '../assets/css/perfil.css';
</style>