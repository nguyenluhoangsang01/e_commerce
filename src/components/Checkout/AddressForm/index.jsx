import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { default as commerce } from "../../../lib/commerce";
import Input from "../Input";

const AddressForm = ({ checkoutToken, handleData }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const { handleSubmit, register } = useForm();

  const fetchShippingCountries = (checkoutTokenId) => {
    commerce.services
      .localeListShippingCountries(checkoutTokenId)
      .then((countries) => {
        setShippingCountries(countries.countries);
        setShippingCountry(Object.keys(countries.countries)[0]);
      })
      .catch((error) =>
        console.log(
          "There was an error fetching a list of shipping countries",
          error
        )
      );
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
  }, [checkoutToken]);

  const fetchShippingSubdivisions = (countryCode) => {
    commerce.services
      .localeListSubdivisions(countryCode)
      .then((subdivisions) => {
        setShippingSubdivisions(subdivisions.subdivisions);
        setShippingSubdivision(Object.keys(subdivisions.subdivisions)[0]);
      })
      .catch((error) =>
        console.log("There was an error fetching the subdivisions", error)
      );
  };
  useEffect(() => {
    shippingCountry && fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  const fetchShippingOptions = (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    commerce.checkout
      .getShippingOptions(checkoutTokenId, {
        country,
        stateProvince,
      })
      .then((options) => {
        setShippingOptions(options);
        setShippingOption(options[0].id);
      })
      .catch((error) =>
        console.log("There was an error fetching the shipping methods", error)
      );
  };
  useEffect(() => {
    shippingSubdivision &&
      fetchShippingOptions(
        checkoutToken?.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [checkoutToken, shippingCountry, shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {shippingCountry && shippingSubdivision && shippingOption ? (
        <form
          onSubmit={handleSubmit((data) =>
            handleData({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={6}>
            <Input
              name="firstName"
              label="First Name"
              register={register}
              required
            />
            <Input
              name="lastName"
              label="Last Name"
              register={register}
              required
            />
            <Input
              name="address"
              label="Address"
              register={register}
              required
            />
            <Input name="email" label="Email" register={register} required />
            <Input name="city" label="City" register={register} required />
            <Input
              name="zip"
              label="ZIP / Postal code"
              register={register}
              required
            />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                fullWidth
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select
                fullWidth
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                fullWidth
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.description} - ({option.price.formatted_with_symbol}
                    )
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/cart"
            >
              Back to Cart
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default AddressForm;
