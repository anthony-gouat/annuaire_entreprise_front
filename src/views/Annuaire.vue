<template>
<div>
  <v-app-bar
      color="primary"
      density="compact"
  >
    <v-app-bar-title>Annuaire de l'entreprise</v-app-bar-title>
  </v-app-bar>
  <v-table>
    <v-progress-circular
        v-if="utilisateurs.length===0"
        indeterminate
        color="primary"
    ></v-progress-circular>
    <thead>
    <tr>
      <th class="text-left">
        Nom
      </th>
      <th class="text-left">
        Prénom
      </th>
      <th class="text-left">
        Login
      </th>
      <th class="text-left">
        Date d'arrivée
      </th>
      <th class="text-left">
        Email
      </th>
      <th class="text-left">
        Actions
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="utilisateur in utilisateurs"
        :key="utilisateur.login"
    >
      <td>{{ utilisateur.nom }}</td>
      <td>{{ utilisateur.prenom }}</td>
      <td>{{ utilisateur.login }}</td>
      <td>{{ utilisateur.date_arrivee }}</td>
      <td>{{ utilisateur.email }}</td>
      <td>

          <v-dialog
              transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn style="margin-right: 15px;"
                  v-bind="props"
              ><v-icon color="red">
                mdi-close
              </v-icon></v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text>
                  <div class="text-h2 pa-12">Voulez-vous supprimer l'utilisateur {{utilisateur.prenom}} {{utilisateur.nom}}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                      text
                      @click="isActive.value = false"
                      color="red"
                  >Annuler</v-btn>
                  <v-btn
                      text
                      @click="isActive.value = false;deleteUtilisateur(utilisateur.id)"
                      color="green"
                  >Confirmer</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

        <v-dialog
            transition="dialog-bottom-transition"
            @click:outside="resetUtilisateurAjout()"
        >
          <template v-slot:activator="{ props }">
            <v-btn style="position: absolute;right: 25px"
                   v-bind="props"
                   @click="utilisateurModif={...utilisateur};utilisateurModif.mdp='';utilisateurModif.mdpConfirm=''"
            ><v-icon color="yellow">
              mdi-pencil
            </v-icon></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card width="500px">
              <v-card-title>
                Modification d'un utilsateur
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                        label="Nom"
                        variant="underlined"
                        v-model="utilisateurModif.nom"
                    ></v-text-field><v-text-field
                      label="Prénom"
                      variant="underlined"
                      v-model="utilisateurModif.prenom"
                  ></v-text-field>
                    <v-text-field
                        label="Login"
                        variant="underlined"
                        v-model="utilisateurModif.login"
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        variant="underlined"
                        v-model="utilisateurModif.email"
                        :error-messages="(utilisateurModif.email.length>0 && !(new RegExp(/(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).test(utilisateurModif.email)))?'Erreur dans l\'adresse mail':''"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Date d'arrivée"
                        variant="underlined"
                        placeholder="YYYY-MM-DD"
                        v-model="utilisateurModif.date_arrivee"
                        :error-messages="(!(new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(utilisateurModif.date_arrivee) && dateValid(utilisateurModif.date_arrivee)))?'Date au mauvais format':''"
                    ></v-text-field>
                    <div v-if="utilisateurModif.id === getUtilisateur().id">
                    <v-text-field
                        label="Mot de passe"
                        variant="underlined"
                        v-model="utilisateurModif.mdp"
                    ></v-text-field>
                    <v-text-field
                        label="Confirmation"
                        variant="underlined"
                        v-model="utilisateurModif.mdpConfirm"
                        :error-messages="(utilisateurModif.mdpConfirm && utilisateurModif.mdpConfirm.length>0 && utilisateurModif.mdpConfirm!==utilisateurModif.mdp)?'Les mots de passes doivent correspondre':''"
                    ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="isActive.value = false;"
                    color="red"
                >Annuler</v-btn>
                <v-btn
                    text
                    @click="modifieUtilisateur(isActive)"
                    color="green"
                >Confirmer</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </td>
    </tr>
    </tbody>
  </v-table>
  <v-dialog
      transition="dialog-bottom-transition"
      @click:outside="resetUtilisateurAjout()"
  >
    <template v-slot:activator="{ props }">
      <v-btn style="position: absolute;right: 25px"
             v-bind="props"
      ><v-icon color="green">
        mdi-plus
      </v-icon></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card width="500px">
        <v-card-title>
          Ajout d'un utilsateur
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                  label="Nom"
                  variant="underlined"
                  v-model="utilisateurAjout.nom"
              ></v-text-field><v-text-field
                label="Prénom"
                variant="underlined"
                v-model="utilisateurAjout.prenom"
              ></v-text-field>
              <v-text-field
                  label="Login"
                  variant="underlined"
                  v-model="utilisateurAjout.login"
              ></v-text-field>
              <v-text-field
                  label="Email"
                  variant="underlined"
                  v-model="utilisateurAjout.email"
                  :error-messages="(utilisateurAjout.email.length>0 && !(new RegExp(/(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).test(utilisateurAjout.email)))?'Erreur dans l\'adresse mail':''"
              >
              </v-text-field>
              <v-text-field
                label="Date d'arrivée"
                variant="underlined"
                placeholder="YYYY-MM-DD"
                v-model="utilisateurAjout.dateArrivee"
                :error-messages="(utilisateurAjout.dateArrivee.length>0 && !(new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(utilisateurAjout.dateArrivee) && dateValid(utilisateurAjout.dateArrivee)))?'Date au mauvais format':''"
              ></v-text-field>
              <v-text-field
                  label="Mot de passe"
                  variant="underlined"
                  v-model="utilisateurAjout.mdp"
              ></v-text-field>
              <v-text-field
                  label="Confirmation"
                  variant="underlined"
                  v-model="utilisateurAjout.mdpConfirm"
                  :error-messages="(utilisateurAjout.mdpConfirm.length>0 && utilisateurAjout.mdpConfirm!==utilisateurAjout.mdp)?'Les mots de passes doivent correspondre':''"
              ></v-text-field>

            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="isActive.value = false;resetUtilisateurAjout()"
              color="red"
          >Annuler</v-btn>
          <v-btn
              text
              @click="ajouteUtilisateur(isActive)"
              color="green"
          >Confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment/moment";
import {mapGetters} from "vuex";

export default {
  name: "v-annuaire",
  data(){
    return{
      utilisateurs:[],
      utilisateurModif:null,
      utilisateurAjout:{
        nom:'',
        prenom:'',
        login:'',
        email:'',
        dateArrivee:'',
        mdp:'',
        mdpConfirm:'',
      }
    }
  },
  methods:{
    dateValid(date){
      return moment(date,"YYYY-MM-DD").isValid()
    },
    deleteUtilisateur(id){
      axios.delete('http://127.0.0.1:8855/api/utilisateur/'+id,{
        auth:{
          username: 'annuaire',
          password: 'annuaire'
        }}
      ).then(this.getUtilisateurs)
    },
    ...mapGetters(['getUtilisateur']),
    resetUtilisateurAjout(){
      this.utilisateurAjout.nom='';
      this.utilisateurAjout.prenom='';
      this.utilisateurAjout.login='';
      this.utilisateurAjout.email='';
      this.utilisateurAjout.dateArrivee='';
      this.utilisateurAjout.mdp='';
      this.utilisateurAjout.mdpConfirm='';
    },
    modifieUtilisateur(act) {
      let usr = this.utilisateurModif;
      // eslint-disable-next-line no-control-regex
      if(usr.nom.length>0 && usr.prenom.length>0 && new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(usr.date_arrivee)  && usr.login.length>0 && usr.email.length>0 && (new RegExp(/(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).test(usr.email)) && usr.date_arrivee.length>0 && this.dateValid(usr.date_arrivee)  && usr.mdpConfirm===usr.mdp ){
        axios.put('http://127.0.0.1:8855/api/utilisateur/'+usr.id,{
          nom:usr.nom,
          prenom:usr.prenom,
          login:usr.login,
          email:usr.email,
          date_arrivee:usr.date_arrivee,
          mdp:usr.mdp,
        },{
          auth:{
            username: 'annuaire',
            password: 'annuaire'
          }
        }).then(()=>{
          act.value =false
          this.getUtilisateurs()
          this.resetUtilisateurAjout()
        }).catch(error=>alert(unescape(error.response.data)))
      }else{
        alert("Il y a une erreur")
      }
    },
    ajouteUtilisateur(act){
      let usr = this.utilisateurAjout;
      // eslint-disable-next-line no-control-regex
      if(usr.nom.length>0 && usr.prenom.length>0 && new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(usr.dateArrivee)  && usr.login.length>0 && usr.email.length>0 && (new RegExp(/(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).test(usr.email)) && usr.dateArrivee.length>0 && this.dateValid(usr.dateArrivee) && usr.mdp.length>0 && usr.mdpConfirm===usr.mdp ){
        axios.post('http://127.0.0.1:8855/api/utilisateur',{
          nom:usr.nom,
          prenom:usr.prenom,
          login:usr.login,
          email:usr.email,
          date_arrivee:usr.dateArrivee,
          mdp:usr.mdp,
        },{
          auth:{
            username: 'annuaire',
            password: 'annuaire'
          }
        }).then(()=>{
          act.value =false
          this.getUtilisateurs()
          this.resetUtilisateurAjout()
        }).catch(error=>alert(unescape(error.response.data)))
      }else{
        alert("Il y a une erreur")
      }
    },
    getUtilisateurs:function (){
      axios.get('http://127.0.0.1:8855/api/utilisateur',{auth:{
          username: 'annuaire',
          password: 'annuaire'
        }}).then(response=>{
        this.utilisateurs=response.data
      })
    }
  },
  created()
  {
    this.getUtilisateurs()
  }
}
</script>

<style scoped>

</style>