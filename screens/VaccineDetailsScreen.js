import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LinearGradient } from 'expo-linear-gradient';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const vaccineList = {
  "Hepatitis B":"Vaksin Hepatitis B mengandung antigen permukaan virus hepatitis B (HBsAg) yang sudah dinonaktifkan. Vaksin ini bekerja dengan cara merangsang sistem kekebalan tubuh agar menghasilkan antibodi untuk melawan virus.",
  "Hepatitis A":"Vaksin Hepatitis A mengandung virus hepatitis A yang telah dinonaktifkan. Vaksin ini merangsang sistem kekebalan untuk memproduksi antibodi yang melawan virus hepatitis A, mencegah infeksi dan komplikasi.",
  "COVID-19":"Vaksin COVID-19 untuk bayi dan anak-anak dirancang untuk melindungi mereka dari infeksi virus SARS-CoV-2. Vaksin ini, yang sering menggunakan teknologi mRNA atau protein subunit, bekerja dengan merangsang sistem kekebalan untuk mengenali dan melawan virus.",
  "Chickenpox":"Vaksin cacar air mengandung virus varicella-zoster yang dilemahkan. Vaksin ini membantu mencegah infeksi dengan merangsang tubuh untuk membentuk kekebalan terhadap virus penyebab cacar air.",
  "Human Papillomavirus (HPV)":"Vaksin HPV mengandung protein dari beberapa jenis virus HPV yang paling umum menyebabkan kanker serviks dan kutil kelamin. Vaksin ini merangsang respons imun untuk mencegah infeksi HPV.",
  "Influenza (Flu)":"Vaksin influenza mengandung virus influenza yang dilemahkan atau protein virus yang telah dimurnikan. Vaksin ini diberikan setiap tahun untuk melindungi dari strain flu musiman yang berubah-ubah.",
  "Measles":"Vaksin campak mengandung virus campak yang dilemahkan. Vaksin ini membantu tubuh membentuk kekebalan terhadap virus campak, mencegah penyakit dan komplikasi serius.",
  "Mumps":"Vaksin gondong mengandung virus gondong yang dilemahkan. Vaksin ini merangsang sistem kekebalan untuk menghasilkan antibodi yang melindungi dari infeksi gondong.",
  "Rubella":"Vaksin rubella mengandung virus rubella yang dilemahkan. Vaksin ini sangat penting untuk melindungi bayi dan anak-anak dari infeksi rubella, yang dapat menyebabkan gejala ringan seperti ruam dan demam.",
  "Meningococcal":"Vaksin meningokokus mengandung polisakarida atau protein dari bakteri Neisseria meningitidis. Vaksin ini melindungi dari beberapa serotipe bakteri penyebab meningitis bakteri yang berbahaya.",
  "Pneumococcal":"Vaksin pneumokokus mengandung polisakarida atau protein dari bakteri Streptococcus pneumoniae. Vaksin ini membantu mencegah infeksi pneumokokus yang dapat menyebabkan pneumonia, meningitis, dan infeksi lainnya.",
  "Polio":"Vaksin polio dapat berupa vaksin polio yang dilemahkan (OPV) atau virus polio yang dinonaktifkan (IPV). Vaksin ini melindungi dari virus polio yang dapat menyebabkan kelumpuhan dan komplikasi serius.",
  "Rabies":"Vaksin rabies mengandung virus rabies yang dinonaktifkan. Vaksin ini diberikan sebelum atau setelah terpapar virus rabies untuk mencegah perkembangan penyakit yang hampir selalu fatal.",
  "Tetanus":"Vaksin tetanus mengandung toksoid tetanus yang telah dinonaktifkan. Vaksin ini melindungi dari toksin yang diproduksi oleh bakteri Clostridium tetani, yang menyebabkan kejang otot yang parah.",
  "Tuberculosis (BCG)":"Vaksin BCG mengandung bakteri Mycobacterium bovis yang dilemahkan. Vaksin ini diberikan untuk mencegah tuberculosis (TB), terutama pada anak-anak dan di daerah dengan prevalensi TB yang tinggi.",
  "Yellow Fever":"Vaksin demam kuning mengandung virus demam kuning yang dilemahkan. Vaksin ini melindungi dari penyakit demam kuning, yang dapat menyebabkan demam tinggi, kerusakan hati, dan kematian.",
  "Japanese Encephalitis":"Vaksin ensefalitis Jepang mengandung virus ensefalitis Jepang yang dilemahkan atau dinonaktifkan. Vaksin ini melindungi dari virus yang ditularkan oleh nyamuk dan dapat menyebabkan peradangan otak.",
  "Typhoid":"Vaksin tifoid mengandung polisakarida dari bakteri Salmonella typhi atau bakteri yang dilemahkan. Vaksin ini mencegah demam tifoid, yang dapat menyebabkan demam tinggi dan komplikasi serius.",
  "Cholera":"Vaksin kolera mengandung bakteri Vibrio cholerae yang telah dilemahkan atau dinonaktifkan. Vaksin ini melindungi dari penyakit kolera, yang menyebabkan diare berat dan dehidrasi.",
};

const VaccineDetailsScreen = ({ navigation, route, selectedVaccine="COVID-19", notCompleted=true}) => {
  if(route.params?.selectedVaccine != null){
    selectedVaccine = route.params?.selectedVaccine;
  };
  if(route.params?.notCompleted != null){
    notCompleted = route.params?.notCompleted;
  };
  return(
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={styles.background} />

      <View style={styles.container1}>
        <Text style={styles.text}>Vaksin {selectedVaccine}</Text>
        <Text style={styles.description}>{vaccineList[selectedVaccine]}</Text>
      </View>
      {notCompleted &&
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Appointment")}>
          <Text style={styles.buttonText}>Daftar Sekarang</Text>
        </TouchableOpacity>
      }
      <Image source={require('../assets/jumping-air.png')} style={styles.image} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  container1: {
    alignContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
    paddingHorizontal: 5
  },
  description:{
    textAlign: 'justify',
    marginLeft: 30,
    marginRight: 30,
    fontFamily: 'NunitoSans-Medium',
    width: dw/2 + 150,
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: 'light'
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#E7FCFF',
    borderRadius: 25,
    paddingVertical: 10,
    width: '50%',
    justifyContent:'center',
    alignContent: 'center',
    marginTop:10,
  },
  buttonText: {
    color: Colors.black,
    fontWeight: 'light',
    fontSize: 18,
    width: 76,
    textAlign:'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: dh,
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    top: (dh/-20) + 50,
  },
});

export default VaccineDetailsScreen;

