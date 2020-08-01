const isEmpty = (data) => {
  if (data.trim() === "") return true;
  else return false;
};

const validateEmail = (email) => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regEx)) return true;
  else return false;
};

const checkUsernameIfContainerspecialCharacter = (username) => {
  const format = /[!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/;
  if (format.test(username)) {
    return { valid: false };
  } else {
    return { valid: true };
  }
};

exports.validateSignupDokter = (data) => {
  let errors = {};

  if (
    data.nama === undefined ||
    data.npa === undefined ||
    data.alamat === undefined ||
    data.phone === undefined ||
    data.username === undefined ||
    data.password === undefined ||
    data.email === undefined ||
    data.tanggal_lahir === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    const lengthUsername = data.username.split(" ").length;
    const fixUsername = data.username.split(" ").join("");
    const { valid } = checkUsernameIfContainerspecialCharacter(data.username);

    // Check nama
    if (isEmpty(data.nama)) errors.nama = "Nama is required";
    // Check NPA
    if (isEmpty(data.npa)) errors.npa = "NPA is required";
    // Check alamat
    if (isEmpty(data.alamat)) errors.alamat = "Alamat is required";
    // Check username
    if (isEmpty(data.username)) {
      errors.username = "Username is required";
    } else if (lengthUsername > 1) {
      errors.username = `Username is not allowed to have a white space (${fixUsername})`;
    } else if (!valid) {
      errors.username =
        "Username is not contains special character (@#$%^&*.,<>/';:?)";
    }
    //   Check password
    if (isEmpty(data.password)) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password is to short (min 6)";
    }
    //   Check phone
    if (isEmpty(data.phone)) errors.phone = "No Hp is required";
    // Check email
    if (isEmpty(data.email)) {
      errors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      errors.email = "Email is not valid";
    }
    // Check tanggal lahir
    if (isEmpty(data.tanggal_lahir))
      errors.tanggal_lahir = "Tanggal Lahir is required";

    // Return errors and valid
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

exports.validateUpdateDokter = (data) => {
  let errors = {};

  if (
    data.nama === undefined ||
    data.npa === undefined ||
    data.alamat === undefined ||
    data.phone === undefined ||
    data.email === undefined ||
    data.tanggal_lahir === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    //   Check nama
    if (isEmpty(data.nama)) errors.nama = "Nama tidak boleh kosong";
    //   Check NPA
    if (isEmpty(data.npa)) errors.npa = "NPA tidak boleh kosong";
    //   Check alamat
    if (isEmpty(data.alamat)) errors.alamat = "Alamat tidak boleh kosong";
    //   Check phone
    if (isEmpty(data.phone)) errors.phone = "No Hp tidak boleh kosong";
    // Check email
    if (isEmpty(data.email)) {
      errors.email = "Email tidak boleh kosong";
    } else if (!validateEmail(data.email)) {
      errors.email = "Email tidak valid";
    }
    // Check tanggal lahir
    if (isEmpty(data.tanggal_lahir))
      errors.tanggal_lahir = "Tanggal Lahir tidak boleh kosong";

    // Return errors and valid
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

exports.validateLoginDokter = (data) => {
  let errors = {};
  if (data.username === undefined || data.password === undefined) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    const lengthUsername = data.username.split(" ").length;
    const fixUsername = data.username.split(" ").join("");
    const { valid } = checkUsernameIfContainerspecialCharacter(data.username);

    if (isEmpty(data.username)) {
      errors.username = "Username is required";
    } else if (lengthUsername > 1) {
      errors.username = `Username is not allowed to have a white space (${fixUsername})`;
    } else if (!valid) {
      errors.username =
        "Username is not contains special character (@#$%^&*.,<>/';:?)";
    }
    //   Check password
    if (isEmpty(data.password)) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password is to short (min 6)";
    }

    // Return errors and valid
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

const isInt = (value) => {
  let er = /^-?[0-9]+$/;
  return er.test(value);
};

exports.validatePasien = (data) => {
  let errors = {};

  if (
    data.nama === undefined ||
    data.nik === undefined ||
    data.alamat === undefined ||
    data.phone === undefined ||
    data.tanggal_lahir === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    //   Check nama
    if (isEmpty(data.nama)) errors.nama = "Nama is required";
    if (isEmpty(data.nik)) {
      errors.nik = "Nik is required";
    } else if (!isInt(data.nik)) {
      errors.nik = "Nik is just allow number";
    } else if (data.nik.length !== 16) {
      errors.nik = "Nik must have 16 length of number";
    }
    //   Check alamat
    if (isEmpty(data.alamat)) errors.alamat = "Alamat is required";
    // Check tanggal lahir
    if (isEmpty(data.tanggal_lahir))
      errors.tanggal_lahir = "Tanggal Lahir is required";
    //   Check phone
    if (isEmpty(data.phone)) errors.phone = "No Hp is required";

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

exports.validateService = (data) => {
  let errors = {};

  if (
    data.service_name === undefined ||
    data.service_desc === undefined ||
    data.service_price === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    if (isEmpty(data.service_name))
      errors.service_name = "service_name is required";
    if (isEmpty(data.service_desc))
      errors.service_desc = "service_desc is required";
    if (isEmpty(data.service_price)) {
      errors.service_price = "service_price is required";
    } else if (!isInt(data.service_price)) {
      errors.service_price = "service_price doesn't contains character";
    }

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

exports.validateDrug = (data) => {
  let errors = {};

  if (
    data.drug_name === undefined ||
    data.drug_desc === undefined ||
    data.drug_price === undefined ||
    data.drug_count === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    if (isEmpty(data.drug_name)) errors.drug_name = "drug_name is required";
    if (isEmpty(data.drug_desc))
      errors.drug_desc = "drug_desc obat is required";
    if (isEmpty(data.drug_price)) {
      errors.drug_price = "drug_price is required";
    } else if (!isInt(data.drug_price)) {
      errors.drug_price = "drug_price doesn't contains character";
    }
    if (isEmpty(data.drug_count)) {
      errors.drug_count = "drug_count is required";
    } else if (!isInt(data.drug_count)) {
      errors.drug_count = "drug_count doesn't contains character";
    }

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

exports.validateAppointment = (data) => {
  let errors = {};

  if (
    data.id_pasien === undefined ||
    data.keperluan === undefined ||
    data.tanggal === undefined ||
    data.jam === undefined ||
    data.keluhan === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    if (isEmpty(data.id_pasien)) errors.id_pasien = "id_pasien is required";
    if (isEmpty(data.keperluan)) errors.keperluan = "keperluan is required";
    if (isEmpty(data.tanggal)) errors.tanggal = "tanggal is required";
    if (isEmpty(data.jam)) errors.jam = "jam is required";
    if (isEmpty(data.keluhan)) errors.keluhan = "keluhan is required";

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};

exports.validateDiagnosa = (data) => {
  let errors = {};

  if (
    data.penanganan === undefined ||
    data.services === undefined ||
    data.drugs === undefined ||
    data.total_biaya === undefined
  ) {
    errors.error = "You have wrong with the input, please check again";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  } else {
    //   Check penanganan
    if (isEmpty(data.penanganan)) errors.penanganan = "penanganan is required";
    if (isEmpty(data.services)) errors.services = "services is required";
    if (isEmpty(data.drugs)) errors.drugs = "drugs is required";
    if (!isInt(data.total_biaya))
      errors.total_biaya = "total_biaya just allow number";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  }
};
