import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Input from "../../components/Input";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import RouteGuard from "../../components/RouteGuard/RouteGuard";
import ShortenedUrlBanner from "../../components/ShortenedUrlBanner/ShortenedUrlBanner";
import Skeleton from "../../components/Skeleton/Skeleton";
import Sorter from "../../components/Sorter/Sorter";
import TableHeader from "../../components/Table/TableHeader";
import TableRow from "../../components/Table/TableRow";
import UrlBanners from "../../components/UrlBanners/UrlBanners";
import { MAX_URL_CHARACTERS_POSSIBLE, ROW_PER_PAGE } from "../../constants";
import { useAppContext } from "../../context/state";
import { validateURL } from "../../helpers/validateURL";
import useFetchLinks from "../../hooks/useFetchLinks";
import axiosInstance from "../../Services/axios.services";

const Dashboard = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isURLShortened, setIsURLShortened] = useState(false);
  const [isOlderFirst, setIsOlderFirst] = useState(true);
  const [isURLVeryLong, setIsURLVeryLong] = useState(false);
  const [isURLValid, setIsURLValid] = useState(true);
  const [isShorteningInProgess, setIsShorteningInProgress] = useState(false);
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const {
    state: { accessToken, email },
    setState: { setEmail },
  } = useAppContext();

  const { user_id }: { user_id: string | null } =
    accessToken == "" || !accessToken
      ? { user_id: null }
      : jwtDecode(accessToken);

  const { data, isLoading, mutate, isError, sorteddata } = useFetchLinks(email);

  const [dataLength, setDataLength] = useState<number | undefined>(
    data?.results.length
  );

  const SLICE = isOlderFirst
    ? sorteddata?.results.slice(
        currentPage * ROW_PER_PAGE,
        ROW_PER_PAGE * (currentPage + 1)
      )
    : data?.results.slice(
        currentPage * ROW_PER_PAGE,
        ROW_PER_PAGE * (currentPage + 1)
      );

  const [dataToShow, setDataToShow] = useState<IUserLink[] | undefined>(SLICE);

  useEffect(() => {
    if (data && data.results.length >= 0) {
      setDataLength(data.results.length);
      setDataToShow(SLICE);
    }
  }, [data, isLoading, isOlderFirst]);

  useEffect(() => {
    if (isError && isError.response.status == 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh");
      router.replace("/login");
    }
  }, [isError]);

  const handleInput = (e: React.FormEvent) => {
    setShortenedUrl("");
    const { value } = e.target as HTMLInputElement;

    const urlTests = validateURL(value);

    if (value.length > MAX_URL_CHARACTERS_POSSIBLE) {
      setIsURLVeryLong(true);
    } else setIsURLVeryLong(false);

    if (urlTests.regex_test) setIsURLValid(true);
    else setIsURLValid(false);

    if (urlTests.url_contains_domain_test) setIsURLShortened(true);
    else setIsURLShortened(false);

    setUrl(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let r = (data as IUserLinks)?.results as IUserLink[];

    if (
      url.trim().length != 0 &&
      isURLValid &&
      !isURLVeryLong &&
      !isURLShortened
    ) {
      const formData = {
        long_link: url.trim(),
      };
      setIsShorteningInProgress(true);

      axiosInstance
        .post("links/", formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201 || res.status == 208) {
            setShortenedUrl(res.data.short_link);
            const doesShortenedUrlExist = data?.results.some(
              (link) => link.short_link == res.data.short_link
            );

            if (!doesShortenedUrlExist) {
              mutate({ ...(data as IUserLinks), results: [...r, res.data] });
            }
          }
        })
        .catch((e) => console.log("error in dashboard: ", e))
        .finally(() => setIsShorteningInProgress(false));
    }
  };

  useLayoutEffect(() => {
    if (accessToken && accessToken != "") {
      axiosInstance
        .get(`auth/users/${user_id}/`)
        .then((res) => {
          if (res.status == 200) {
            setEmail(res.data.email);
          }
        })
        .catch((e: any) => {
          if (e.response.status == 401) {
            router.replace("/login");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh");
          }
        });
    }
  }, [accessToken]);

  return (
    <section className=" min-h-screen px-2">
      <div className="w-full px-3 flex flex-col items-center my-14">
        <form
          className="w-full bg flex flex-col md:flex-row gap-2 my-3 max-w-lg mx-auto md:max-w-5xl md:my-6 items-stretch  "
          action=""
          onSubmit={handleSubmit}
        >
          <Input
            className="rounded-[4px] h-[46px] "
            handleChange={(e) => handleInput(e)}
            labelFor="url"
            label=""
            type="text"
            value={url}
            showRedBorder={false}
            placeholder="https://enterthatlongurlyouhaveandgetitshortened.com"
          />
          <button
            className="mini-btn text-[#fff] py-3  border-[#2B7FFF] bg-[#2B7FFF]  md:px-10 flex-shrink-0"
            type="submit"
          >
            Generate short URL
          </button>
        </form>

        {/* UrlBanner shows when user tries to shorten an invalid URL/already shortened URL . */}
        <UrlBanners
          isURLValid={isURLValid}
          isURLVeryLong={isURLVeryLong}
          url={url}
          isURLShortened={isURLShortened}
        />
        {shortenedUrl != "" && !isShorteningInProgess && (
          <ShortenedUrlBanner shortenedUrl={shortenedUrl} />
        )}

        {isShorteningInProgess && (
          <div className="mt-3">
            <Loader color="bg-[#0B1A30]" />
          </div>
        )}
      </div>

      <div className="px-3 mt-10 py-5 flex justify-between items-center">
        <p className="font-semibold tracking-wide  text-[#0B1A30] py-1">
          GENERATED LINKS
        </p>
        <div className="flex items-center gap-3">
          <p className="text-sm">
            Total:{" "}
            {isLoading ? (
              <Skeleton className="w-4 h-3 inline-block" />
            ) : (
              <span className="text-lg font-semibold">
                {dataLength as number}
              </span>
            )}
          </p>
          <Sorter
            isLoading={isLoading}
            isOlderFirst={isOlderFirst}
            setIsOlderFirst={setIsOlderFirst}
          />
        </div>
      </div>

      {/* Table to show when data arrives  */}
      {data && data.results.length > 0 && (
        <div>
          <p className="text-sm text-center mb-2">
            <span className="font-bold">Note:</span>
            The table below can be scrolled rightwards.
          </p>

          <div className="w-full  px-3 overflow-x-scroll lg:overflow-x-auto min-h-[651px]">
            <table className="w-full min-w-[650px] px-3 text-left">
              {/* <table className="w-full min-w-[800px] px-3 text-left"> */}
              <TableHeader />
              <tbody className="text-sm">
                {dataToShow?.map((link, index) => (
                  <TableRow
                    link={link}
                    data={data}
                    mutate={mutate}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination component goes here  */}
      {/* It shows only when there is data and the number of data is > 10 */}
      {data && data.results.length > 10 && (
        <Pagination
          data={isOlderFirst ? sorteddata : data}
          setDataToShow={setDataToShow}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Table skeleton to show while data is loading  */}
      {isLoading && <Skeleton className="w-full h-36 " />}

      {/* what appears when there is no shortened links yet  */}
      {data && data.results.length == 0 && (
        <p className="text-center">
          :( Seems you haven&apos;t generated a short link at all.
        </p>
      )}
    </section>
  );
};

export default RouteGuard(Dashboard);
