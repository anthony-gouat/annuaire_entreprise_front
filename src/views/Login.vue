<template>
  <div id="login" style="margin-top: 50px">

    <!--        Formulaire de connexion        -->
    <v-form v-on:submit.prevent="true">
      <v-container style="padding-bottom: 0px !important;">
        <v-col cols="auto" sm="6"  style="margin:auto !important;width: 400px;padding-bottom: 0px !important;">
          <v-row justify="center" style="display: grid;padding: 0;margin: 0">
            <h1 style="text-align: center">Espace de connexion</h1>
          </v-row>
          <v-row justify="center" style="padding: 0;margin: 0">
            <!--            Identifiant       -->
            <v-text-field
                v-model="loginForm.login"
                placeholder="Identifiant"
                autocomplete="login"
                type="login"
                id="login1"
                variant="underlined"
            ></v-text-field>
          </v-row>
          <v-row justify="center" style="padding: 0;margin: 0">

            <!--            Mot de passe      -->
            <v-text-field
                class="v-text-field"
                v-model.trim="loginForm.mdp"
                placeholder="Mot de passe"
                autocomplete="current-password"
                :append-icon="showLog ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (showLog = !showLog)"
                :type="showLog ? 'password' : 'text'"
                id="password1"
                style="margin-bottom: 45px;"
                variant="underlined"
            ></v-text-field>
          </v-row>
          <v-row style="padding: 0;margin: 0">
            <v-col cols="auto" sm="9" style="margin:auto !important;display: inline-grid;padding: 0;">
              <v-btn @click="login()" >Connexion</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import axios from "axios";
import router from "@/router";

export default {
  name: "v-login",
  data(){
    return{
      topath:'home',
      showLog: true, // affiche en clair le mdp
      loginError: '', // erreur de login
      loginForm: {
        login: '',
        mdp: ''
      },
    }
  },
  computed:{
    ...mapGetters(['getUtilisateur'])
  },
  methods: {
    ...mapMutations(['setUtilisateur']),
    // connexion avec l'api
    login:function() {
      let v = this
      // post sur l'adresse de l'API d'authentification
      axios.post('http://127.0.0.1:8855/api/utilisateur/authentification', {
            login: this.loginForm.login,
            mdp: this.loginForm.mdp
          }
      )
          .then((response)=> {
              v.setUtilisateur(response.data) // on initialise l'utilisateur
              router.push({name:v.topath}) // on va sur la page
          }).catch(function(error) { // si il y a une erreur
        console.log(error)
        alert("Erreur Identifiant/Mot de passe inconnu")
      })
    },
  },
  created() {
    // effectue la connexion si on appuie sur entrer
    if(this.$route.params.topath)
      this.topath = this.$route.params.topath.name
  }
}
</script>

<style scoped>

</style>