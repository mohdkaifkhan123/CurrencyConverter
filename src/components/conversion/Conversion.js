import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SplashScreen from 'react-native-splash-screen';
import {fetchCurrencyLatest, convertCurrencyAPI} from '../api/api';
import {Platform} from 'react-native';
const Conversion = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [open, setOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);
  const [sourceAmount, setSourceAmount] = useState('0'); // Default source amount
  const [sourceCurrency, setSourceCurrency] = useState('USD'); // Default source currency
  const [targetAmount, setTargetAmount] = useState('0');
  const [targetCurrency, setTargetCurrency] = useState('INR'); // Default target currency
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Dummy data for flags to display when the component loads
  const obj = {
    AUD: 'AU',
    BGN: 'BG',
    BRL: 'BR',
    CAD: 'CA',
    CHF: 'CH',
    CNY: 'CN',
    CZK: 'CZ',
    DKK: 'DK',
    GBP: 'GB',
    HKD: 'HK',
    HUF: 'HU',
    IDR: 'ID',
    ILS: 'IL',
    INR: 'IN',
    ISK: 'IS',
    JPY: 'JP',
    KRW: 'KR',
    MXN: 'MX',
    MYR: 'MY',
    NOK: 'NO',
    NZD: 'NZ',
    PHP: 'PH',
    PLN: 'PL',
    RON: 'RO',
    SEK: 'SE',
    SGD: 'SG',
    THB: 'TH',
    TRY: 'TR',
    USD: 'US',
    ZAR: 'ZA',
  };

  useEffect(() => {
    // Fetch currency list and mark data as loaded when component mounts
    fetchCurrencyLatest().then(list => {
      setCurrencyList(list);
      setDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  const convertCurrency = (amount, sourceCurrency, targetCurrency) => {
    setLoading(true);
    convertCurrencyAPI(amount, sourceCurrency, targetCurrency).then(data => {
      const {rates} = data;
      setTargetAmount(String(rates[targetCurrency]));
      setLoading(false);
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
      <View>
        <Text style={styles.text2}>
          Check live rates, set rate alerts, receive{' '}
        </Text>
        <Text style={styles.text3}>notifications and more.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text4}>Amount</Text>

        <View style={styles.source}>
          <Image
            source={{
              uri: `https://flagsapi.com/${obj[sourceCurrency]}/flat/64.png`,
            }}
            style={{width: 64, height: 64}}
          />
          {sourceCurrency && (
            <Text style={styles.selectedCountryText}>{sourceCurrency}</Text>
          )}
          <DropDownPicker
            containerStyle={styles.dropdownContainer}
            style={styles.textInput}
            onChangeText={value => setSourceCurrency(value)}
            open={open}
            value={sourceCurrency}
            items={currencyList.map(currency => ({
              label: currency,
              value: currency,
            }))}
            setOpen={setOpen}
            setValue={setSourceCurrency}
            zIndex={2}
            searchable={true}
            searchablePlaceholder="Search for currency"
          />

          <TextInput
            style={styles.textInput2}
            onChangeText={value => setSourceAmount(value)}
            value={sourceAmount}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.source2}>
          <Image
            source={{
              uri: `https://flagsapi.com/${obj[targetCurrency]}/flat/64.png`,
            }}
            style={{width: 64, height: 64}}
          />
          {sourceCurrency && (
            <Text style={[styles.selectedCountryText, {zIndex: -1}]}>
              {targetCurrency}
            </Text>
          )}
          <DropDownPicker
            containerStyle={styles.dropdownContainer2}
            style={[styles.textInput, {zIndex: -1}]}
            onChangeText={value => setTargetCurrency(value)}
            open={targetOpen}
            value={targetCurrency}
            items={currencyList.map(currency => ({
              label: currency,
              value: currency,
            }))}
            setOpen={setTargetOpen}
            setValue={setTargetCurrency}
            zIndex={-1}
            searchable={true}
            searchablePlaceholder="Search for currency"
          />

          <TextInput
            style={[styles.textInput2, {zIndex: -1}]}
            onChangeText={value => setTargetAmount(value)}
            value={targetAmount}
            editable={true}
          />
        </View>
      </View>
      <View style={{zIndex: -2}}>
        {loading ? (
          <ActivityIndicator color="#000000" size="large" />
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              convertCurrency(sourceAmount, sourceCurrency, targetCurrency)
            }>
            <Text style={styles.textBt}>Convert</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'silver',
  },
  text: {
    color: '#1F2261',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
  },
  text2: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  text3: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  card: {
    marginTop: 49,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 60,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 5,
  },
  text4: {
    marginTop: -25,
    marginLeft: 20,
    color: '#989898',
    fontSize: 18,
    fontWeight: '400',
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
  },
  source2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 20,
    zIndex: -1,
  },
  textInput: {
    width: 40,
    borderWidth: 0,
  },
  textInput2: {
    width: 100,
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 15,
    borderWidth: 0,
    backgroundColor: '#EFEFEF',
  },
  dropdownContainer: {
    width: 85,
  },
  dropdownContainer2: {
    width: 85,
    zIndex: -1,
  },
  selectedCountryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#26278D',
    textAlign: 'center',
    paddingLeft: 8,
  },
  line: {
    marginTop: 35,
    marginLeft: 45,
    marginRight: 45,
    paddingVertical: 1,
    backgroundColor: '#E7E7EE',
    zIndex: -1,
  },
  primaryButton: {
    marginTop: 40,
    marginLeft: 79,
    marginRight: 98,
    marginVertical: 18,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    activeOpacity: 0.7,
    zIndex: -3,
  },
  textBt: {
    fontWeight: '400',
    fontSize: 20,
    zIndex: -3,
  },
});

export default Conversion;
