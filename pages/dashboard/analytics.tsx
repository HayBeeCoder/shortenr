import jwtDecode from "jwt-decode";
import React, { useLayoutEffect } from "react";
import MiniCard from "../../components/MiniCard/MiniCard";
import RouteGuard from "../../components/RouteGuard/RouteGuard";
import SubAnalytic from "../../components/SubAnalytic/SubAnalytic";
import Subanalytics from "../../components/SubAnalytics/SubAnalytics";
import ViewBanner from "../../components/ViewBanner/ViewBanner";
import { useAppContext } from "../../context/state";
import useFetchLinks from "../../hooks/useFetchLinks";
import axiosInstance from "../../Services/axios.services";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import useFetchLink from "../../hooks/useFetchLink";

const Page = () => {
  // console.log
  // const {data} = use
  const router = useRouter();
  // console.log(router.asPath)
  const link_id = router.query.id;
  // console.log(link_id)
  // console.log("userId: " , user_id)
  const {
    state: { email, accessToken, link },
    setState: { setEmail },
  } = useAppContext();
  // console.log(typeof link_id)
  // const user
  // console.log("link Id: " , link)
  // console.log(email)
  // const { data, isLoading, mutate } = useFetchLinks(!!email.length ? email : null)
  const { data, isLoading, mutate } = useFetchLink(link_id as string);
  // console.log(data)

  // console.log(data)
  useLayoutEffect(() => {
    // console.log(user_id)

    if (accessToken && accessToken != "") {
      const { user_id } = jwtDecode(accessToken) as { user_id: string };

      axiosInstance
        .get(`auth/users/${user_id}/`)
        .then((res) => {
          if (res.status == 200) {
            setEmail(res.data.email);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [accessToken]);
  return (
    <section className="md:h-screen  w-full  px-[20px] gap-2 my-5">
      {/* bg-[#F9F9FC] */}
      <div className="md:grid gap-y-5">

      <div className="mb-3 space-y-3  md:space-y-0  gap-4  md:p-0 rounded-md md:rounded-none  md:bg-white block  w-max mx-auto">
        <MiniCard
          property="Original URL"
          value={data?.long_link as string}
          isLoading={isLoading}
          />

        {/* <div className='col-start-4 col-span-3'> */}

        <MiniCard
          property="Shortened URL"
          value={data?.short_link as string}
          isLoading={isLoading}
          colored
        />
        {/* </div> */}
        {/* <div className='col-start-7 col-span-2'> */}
        <MiniCard
          property="Date Created"
          value={dayjs(data?.date_created as string).format("MMM D, YYYY")}
          isLoading={isLoading}
        />
        {/* </div> */}
      </div>

      {/* <div className='col-start-5 col-span-4  row-start-2 row-span-2 md:flex justify-around items-center'> */}

      <div className="md:h-[300px] md:grid grid-cols-12 gap-3">
        <div className="col-start-1 col-span-4 md:h-full">
          <ViewBanner
            view_count={data ? (data?.visit_count as number).toString() : ""}
            isLoading={isLoading}
          />
        </div>
        <div className="col-start-5 col-span-8 ">
          <SubAnalytic
            title="Views"
            toolTipMessage="Visits count within current month"
          >
            <canvas id="starChart" width={250} height={250} />
          </SubAnalytic>
        </div>
      </div>

      <Subanalytics
        date_analytics={
          data
            ? (data?.analytic.date_time_anaylytic as IDateTimeAnalytics)
            : ({} as IDateTimeAnalytics)
        }
        other_analytics={
          data
          ? (data?.analytic.other_analytic as IOtherAnalytics)
          : ({} as IOtherAnalytics)
        }
        isLoading={isLoading}
        />
        </div>
    </section>
  );
};

export default RouteGuard(Page);

// export async function getStaticPath(){

// }
// export const getServerSideProps: GetServerSideProps = async(context)=>{
//   const { id } = context.query;
//     return{
//         props: {
//           id
//         }
//     }

// }

// // export async function getStaticProps() {
// //     return {
// //       props: {
// //         protected: true,
// //       },
// //     }
// //   }
